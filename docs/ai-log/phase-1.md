# AI`a sorulan:

- Şu an elimde her işi tek başına yapan bir NotificationService var. Bu yapıyı Factory Method tasarım örüntüsüyle refactor etmek istiyorum. Nesne yaratma mantığını servisten tamamen koparacak, her bildirim tipi için ortak bir arayüz kullanacak ve bu nesneleri bir fabrika sınıfı üzerinden üretecek bir yapı kurar mısın? Ayrıca, her bildirimin kendine has doğrulama kuralları olduğunu da unutma.

- [ NotificationService kodu (spagetti kod hali) ]

# AI`ın cevabı: 

Harika bir karar! Mevcut NotificationService sınıfın tam anlamıyla Single Responsibility Principle (Tek Sorumluluk İlkesi) ve Open/Closed Principle (Açık/Kapalı İlkesi) prensiplerini ihlal eden klasik bir "God Class" örneği. Yeni bir bildirim tipi (örneğin WhatsApp) eklemek istediğinde mevcut kodu değiştirmek zorunda kalıyordun.

Factory Method örüntüsüyle bu yapıyı tamamen esnek, genişletilebilir ve temiz bir hale getirebiliriz. Nesne yaratma mantığını soyutlayarak, her bildirim tipinin kendi doğrulama ve gönderim mantığını kendi içinde barındırmasını sağlayacağız.

TypeScript ile tasarladığım yeni mimari aşağıdadır:

1. Ortak Arayüz ve Payload Tipleri (notification.interface.ts)
İlk olarak her bildirim sınıfının uyması gereken ortak arayüzü (INotification) tanımlıyoruz. Ayrıca temel payload tipini ve validation sonucunu netleştiriyoruz.

TypeScript
export type NotificationPayload = {
  to: string;
  subject?: string;
  message: string;
  title?: string;
};

export interface ValidationResult {
  isValid: boolean;
  errorDetail?: string;
}

// Tüm bildirim sınıflarının uygulayacağı ortak arayüz
export interface INotification {
  validate(payload: NotificationPayload): ValidationResult;
  send(payload: NotificationPayload): { success: boolean; detail: string };
}
2. Somut Bildirim Sınıfları (Concrete Products)
Her bildirim tipi kendi doğrulama (validation) ve gönderim (send) mantığından sorumludur. API anahtarları gibi bağımlılıklar artık ilgili sınıfların içinde kapsüllenmiştir (encapsulated).

TypeScript
// --- Email Sınıfı ---
export class EmailNotification implements INotification {
  private emailApiKey = "EMAIL_API_KEY";

  validate(payload: NotificationPayload): ValidationResult {
    if (!payload.subject) {
      return { isValid: false, errorDetail: "Email requires subject" };
    }
    if (this.emailApiKey.length < 10) {
      return { isValid: false, errorDetail: "Invalid email API key" };
    }
    return { isValid: true };
  }

  send(payload: NotificationPayload) {
    const validation = this.validate(payload);
    if (!validation.isValid) {
      return { success: false, detail: validation.errorDetail! };
    }

    console.log(
      `Sending email to ${payload.to}, subject: ${payload.subject}, message: ${payload.message} using key ${this.emailApiKey}`
    );
    return { success: true, detail: "Email sent" };
  }
}

// --- SMS Sınıfı ---
export class SmsNotification implements INotification {
  private smsApiKey = "SMS_API_KEY";

  validate(payload: NotificationPayload): ValidationResult {
    if (payload.to.length < 5) {
      return { isValid: false, errorDetail: "Invalid phone number" };
    }
    if (this.smsApiKey.indexOf("SMS") === -1) {
      return { isValid: false, errorDetail: "Invalid SMS API key" };
    }
    return { isValid: true };
  }

  send(payload: NotificationPayload) {
    const validation = this.validate(payload);
    if (!validation.isValid) {
      return { success: false, detail: validation.errorDetail! };
    }

    console.log(
      `Sending SMS to ${payload.to}, message: ${payload.message} using key ${this.smsApiKey}`
    );
    return { success: true, detail: "SMS sent" };
  }
}

// --- Push Notification Sınıfı ---
export class PushNotification implements INotification {
  private pushApiKey = "PUSH_API_KEY";

  validate(payload: NotificationPayload): ValidationResult {
    if (!payload.title) {
      return { isValid: false, errorDetail: "Push requires title" };
    }
    if (!this.pushApiKey) {
      return { isValid: false, errorDetail: "Missing push API key" };
    }
    return { isValid: true };
  }

  send(payload: NotificationPayload) {
    const validation = this.validate(payload);
    if (!validation.isValid) {
      return { success: false, detail: validation.errorDetail! };
    }

    console.log(
      `Sending push to ${payload.to}, title: ${payload.title}, message: ${payload.message} using key ${this.pushApiKey}`
    );
    return { success: true, detail: "Push sent" };
  }
}
3. Fabrika Sınıfları (Creator / Factory Method)
Factory Method örüntüsünün kalbi burasıdır. Nesne üretim mantığını soyut bir Creator üzerinden yönetebileceğimiz gibi, pratik kullanım için bir Simple Factory veya Abstract Creator yapısı kurabiliriz. Burada genişletilebilirliği en temiz sağlayan Factory yapısını kuruyoruz.

TypeScript
export type NotificationType = "email" | "sms" | "push";

// Fabrika Sınıfı
export class NotificationFactory {
  // Nesne üretim mantığı tamamen buraya devredildi
  public static createNotification(type: NotificationType): INotification {
    switch (type) {
      case "email":
        return new EmailNotification();
      case "sms":
        return new SmsNotification();
      case "push":
        return new PushNotification();
      default:
        throw new Error("Unknown notification type");
    }
  }
}
4. Yenilenen Temiz Sınıf (NotificationService)
Artık NotificationService içinde devasa if-else veya switch-case blokları yok. Sadece ortak bir kontrol (base validation) yapar, fabrikayı çağırır ve işi soyut arayüze devreder.

TypeScript
export class NotificationService {
  send(
    type: NotificationType,
    payload: NotificationPayload,
  ): { success: boolean; detail: string } {
    
    // Genel ortak doğrulama
    if (!payload || !payload.to || !payload.message) {
      return { success: false, detail: "Invalid payload" };
    }

    try {
      // Nesne yaratma mantığı servisten tamamen koptu
      const notificationProcessor = NotificationFactory.createNotification(type);
      
      // Polimorfizm (Çok biçimlilik) sayesinde runtime'da doğru send metodu tetiklenir
      return notificationProcessor.send(payload);
    } catch (error: any) {
      return { success: false, detail: error.message };
    }
  }
}

# Benim yaptığım:

AI'ın önerdiği temel Factory Method yapısını uyguladım ancak şu noktalarda kendi kararlarımı vererek tasarıma müdahale ettim: 

- Validation Refactoring: AI başlangıçta subject veya title gibi doğrulamaları hala ana serviste tutmayı öneriyordu. Ben ise Single Responsibility Principle gereği, bu doğrulamaların her sınıfın kendi içinde yapılması gerektiğini düşündüğüm için öyle uygulama gereği duydum. Örneğin, EmailNotification sınıfı artık kendi içindeki send metodunda subject kontrolünü kendisi yapıyor.

- Error Handling: Fabrikada bilinmeyen bir tip gelmesi durumunda fırlatılacak hata mesajlarını, sistemin çökmemesi için kontrollü bir try-catch bloğu ile NotificationService katmanında yakalayıp kullanıcıya anlamlı bir success: false yanıtı dönecek şekilde özelleştirdim.

- Clean Code: Parametre karmaşasını önlemek adına NotificationPayload tipini daha esnek bir hale getirdim.  