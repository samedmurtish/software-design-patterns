# Seçtiğim Konu: A (Bildirim Sistemi)

## Kullandığım teknolojiler:

- Runtime: Node.js
- Framework: Express.js
- Language: TypeScript
- Version Control: Git & GitHub

## Gerekçe

Modern dijital platformlarda bildirim sistemleri, kullanıcı sadakati ve hesap güvenliği için kritik bir köprü görevi görür. Mevcut yapıdaki if-else kontrol zincirleri ve monolitik sınıf yapısı, sisteme yeni iletişim kanalları eklenmesini zorlaştırarak sürdürülebilirliği engellemektedir. Bu projede tasarım örüntülerini kullanarak, her bildirim tipinin kendi mantığını yönettiği, genişletilebilir ve SOLID prensiplerine uygun bir mimari inşa etmeyi hedefliyorum. Buyüzden Bildirim Sistemi konusunu seçtim.

## Proje Hakkında

Bu proje, katı yazılım mimarisi kurallarına (SOLID) ve tasarım ilkelerine sadık kalınarak geliştirilmiş, modüler ve yüksek genişletilebilirlik seviyesine sahip bir Bildirim Yönetim Sistemi projesidir. Proje kapsamında Creational, Structural ve Behavioral örüntüler aşamalı olarak (Phase 1, 2, 3) sisteme entegre edilmiştir.

## Projenin Amacı
Modern platformlarda bildirim sistemleri genellikle karmaşık ve spagetti kod yapısına (if-else zincirleri) dönüşmeye meyillidir. Bu proje, nesne yaratımını, uyuşmaz arayüzlerin adaptasyonunu ve dinamik davranış değişikliklerini tasarım örüntüleri ile çözerek, Open/Closed Principle (OCP) prensibine tam uyumlu bir altyapı sunar.

## Kullanılan Tasarım Örüntüleri

### 1. Factory Method Pattern
- Kullanım Amacı: Bildirim kanallarının (`Email`, `Sms`, `Push`) nesne yaratım süreçlerini soyutlamak.
- Çözüm: `NotificationService` sınıfının somut sınıflara olan bağımlılığını yok ederek, nesne üretimini `NotificationFactory` sınıfına devreder.

### 2. Adapter Pattern
- Kullanım Amacı: Mevcut sisteme uyumsuz metot imzasına sahip üçüncü parti kütüphaneleri (`LegacySmsApi`) entegre etmek.
- Çözüm: `LegacySmsAdapter` sınıfı ile dış kütüphane koduna dokunmadan, sistemi mevcut `INotification` arayüzüne (interface) uydurur.

### 3. Decorator Pattern
- Kullanım Amacı: Çekirdek kodları kirletmeden bildirim süreçlerine dinamik yetenekler kazandırmak.
- Çözüm: `LoggingDecorator` ile tüm bildirimlere gönderim öncesi ve sonrası otomatik loglama özelliği ekler.

### 4. Strategy Pattern
- Kullanım Amacı: Bildirimlerin gönderim zamanlamasını ve öncelik stratejilerini dinamik olarak değiştirmek.
- Çözüm: `InstantDeliveryStrategy` ve `BulkDelayStrategy` gibi stratejiler ile gönderim lojiğini `NotificationService` dışına taşır.

### 5. Observer Pattern
- Kullanım Amacı: Bildirim başarıyla gönderildiğinde diğer bağımsız servisleri (Analytics, Audit) haberdar etmek.
- Çözüm: Gevşek bağlı (loosely coupled) bir event sistemi kurarak, servisin içine kod yazmadan yeni dinleyiciler (listeners) eklenmesini sağlar.

## Mimari Diyagram



```mermaid
classDiagram
    class INotification {
        <<interface>>
        +send(to: string, message: string) void
    }

    class NotificationDecorator {
        <<abstract>>
        #wrappedNotification: INotification
        +send(to: string, message: string) void
    }

    class NotificationSubject {
        -listeners: NotificationListener[]
        +attach(listener) void
        +notify(event, status, payload) void
    }

    class NotificationService {
        -strategy: NotificationStrategy
        +send(type, payload) void
    }

    INotification <|.. LegacySmsAdapter : Implements
    INotification <|.. NotificationDecorator : Implements
    NotificationDecorator <|-- LoggingDecorator : Inherits
    NotificationSubject <|-- NotificationService : Extends
    NotificationService --> NotificationStrategy : Uses
    NotificationService --> INotification : Sends