# Phase 1: Factory Method Pattern (Creational)

## Nerede Uygulandı?
- Sistemdeki bildirim kanallarının (Email, SMS, Push) nesne yaratım süreçlerinde uygulandı. NotificationService sınıfının içindeki harici kanal bağımlılıkları ve nesne ayağa kaldırma mantığı tamamen soyutlanarak yeni bir katmana taşındı.

## Neden Uygulandı?
- Single Responsibility Principle İhlali: Eski yapıda ana servis hem iş mantığını yönetiyor hem de hangi nesnenin nasıl yaratılacağını, hangi API anahtarlarıyla ayağa kalkacağını biliyordu.

- Sıkı Bağımlılık: Nesne yaratımı sınıfa gömülü olduğu için harici servislerin yönetimi ve test edilmesi imkansızdı.

- Nesne yaratma sorumluluğunu tek bir merkezde toplamak ve istemci sınıfları bu karmaşadan kurtarmak için Factory Method tercih edilmiştir.

## Ne Kazandınız?
- Open/Closed Principle Uyumu: Sisteme yeni bir bildirim kanalı eklemek istediğimizde, mevcut NotificationService koduna asla dokunmamız gerekmeyecek. Sadece yeni bir somut sınıf yazıp fabrikaya eklememiz yeterli olacak.

- Gevşek Bağlılık: Servis artık somut sınıflara bağımlı değil; sadece INotification arayüzü üzerinden haberleşiyor.

- Kolay Test Edilebilirlik: Nesne yaratımı soyutlandığı için birim testlerde sahte bildirim nesneleri üretmek kolaylaştı.