# Phase 1: Factory Method Pattern

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

# Phase 2: Adapter Pattern

## Nerede Uygulandı?
- Sistemimize sonradan dahil olan ve metot imzası uyumsuz olan harici üçüncü parti LegacySmsApi servisinin, bizim INotification arayüzümüze uydurulması sürecinde uygulandı.

## Neden Uygulandı?
- Dışarıdan aldığımız kütüphanelerin kaynak kodunu değiştirme şansımız yoktur. Bizim sistemimiz .send(to, message) metodunu tetiklemeyi beklerken, dış kütüphane .pushMessage(phone, text, isFlash) imzasını dayatıyordu. Bu uyumsuzluğu çözmek ve core mimariyi bozmamak için araya bir köprü (adaptör) koymak şarttı.

## Ne Kazandınız?
- Kod Değişmezliği: Harici bir bağımlılık için kendi çekirdek servislerimizde (NotificationService vb.) tek bir satır bile değişiklik yapmadan entegrasyonu tamamladık.

- Vendor Isolation: Yarın bir gün bu legacy SMS firmasından vazgeçip başka bir firmaya geçsek bile sadece yeni bir adaptör yazacağız, sistemin kalbi bundan etkilenmeyecek.

# Phase 2: Decorator Pattern

## Nerede Uygulandı?
- Tüm bildirim kanallarına gönderim öncesi ve sonrası dinamik olarak loglama yeteneği kazandırmak amacıyla NotificationDecorator ve LoggingDecorator sınıflarında uygulandı.

## Neden Uygulandı?
- Bildirimlerin gönderilme anını loglamak veya metriklerini tutmak gibi kesişen sorumlulukları, somut bildirim sınıflarının (Email, Sms) içerisine tek tek console.log yazarak eklemek kod kirliliğine ve SRP ihlaline yol açacaktı. Davranışları nesnelere çalışma zamanında dinamik olarak giydirmek için bu desen seçilmiştir.

## Ne Kazandınız?
- Temiz Kod ve Esneklik: Mevcut bildirim sınıflarının içini loglama kodlarıyla kirletmemiş olduk.

- Genişletilebilirlik: İleride hata durumunda yeniden deneme veya şifreleme (Encryption) özellikleri geldiğinde, mevcut kodları hiç ellemeden yeni decorator'lar yazıp bunları üst üste bir zincir gibi sarmalayabileceğiz.