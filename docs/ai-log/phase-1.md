# AI`a sorulan:

- Şu an elimde her işi tek başına yapan bir NotificationService var. Bu yapıyı Factory Method tasarım örüntüsüyle refactor etmek istiyorum. Nesne yaratma mantığını servisten tamamen koparacak, her bildirim tipi için ortak bir arayüz kullanacak ve bu nesneleri bir fabrika sınıfı üzerinden üretecek bir yapı kurar mısın? Ayrıca, her bildirimin kendine has doğrulama kuralları olduğunu da unutma.

- [ NotificationService kodu (spagetti kod hali) ]

# 2. AI'ın Yanıtı (Özet)

Bu NotificationService her işi kendi yapan, devasa if-else bloklarıyla dolu, hantal bir sınıf (God Class). Sisteme yeni bir bildirim türü (örneğin WhatsApp) eklemek için mevcut kodu değiştirmek gerekiyor ve bu durum Single Responsibility (Tek Sorumluluk) ile Open/Closed (Açık/Kapalı) prensiplerini çiğniyor.

Factory Method Örüntüsü uygulanarak bu spagetti yapı 4 temiz adıma bölünmeli:

INotification (Ortak Sözleşme): Tüm bildirim türlerinin uyması gereken kurallar (validate ve send) bir arayüz (interface) olarak tanımlanmalı.

Somut Sınıflar (Email, Sms, Push): Her bildirim türü kendi API anahtarlarını, doğrulama kurallarını ve gönderim mantığını kendi içine hapsetmeli (Encapsulation).

NotificationFactory (Üretim Merkezi): Hangi nesnenin ne zaman yaratılacağı kararı ana servisten alınarak bu fabrikaya devretmeli.

NotificationService (Orkestra Şefi): Ana servis artık nesne yaratmayı veya alt detayları bilmiyor. Sadece fabrikadan nesneyi istiyor ve send() diyerek işi polimorfizm (çok biçimlilik) sayesinde runtime'a bırakıyor.

# Benim yaptığım:

AI'ın önerdiği temel Factory Method yapısını uyguladım ancak şu noktalarda kendi kararlarımı vererek tasarıma müdahale ettim: 

- Validation Refactoring: AI başlangıçta subject veya title gibi doğrulamaları hala ana serviste tutmayı öneriyordu. Ben ise Single Responsibility Principle gereği, bu doğrulamaların her sınıfın kendi içinde yapılması gerektiğini düşündüğüm için öyle uygulama gereği duydum. Örneğin, EmailNotification sınıfı artık kendi içindeki send metodunda subject kontrolünü kendisi yapıyor.

- Error Handling: Fabrikada bilinmeyen bir tip gelmesi durumunda fırlatılacak hata mesajlarını, sistemin çökmemesi için kontrollü bir try-catch bloğu ile NotificationService katmanında yakalayıp kullanıcıya anlamlı bir success: false yanıtı dönecek şekilde özelleştirdim.

- Clean Code: Parametre karmaşasını önlemek adına NotificationPayload tipini daha esnek bir hale getirdim.  