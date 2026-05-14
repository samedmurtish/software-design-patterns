# 1. AI'a Sorulan Soru
- "Üçüncü parti uyuşmaz bir SMS servisini `LegacySmsApi` sisteme entegre etmek için Adapter pattern mı kullanmalıyım yoksa Facade mı? Farkı nedir?"

# 2. AI'ın Yanıtı (Özet)
- AI, her iki örüntünün de yapısal olduğunu ve uyuşmazlıkları çözebileceğini belirtti. Ancak harici sistemi tamamen sarmalamak ve `NotificationService` üzerindeki yükü azaltmak adına başlangıçta daha geniş kapsamlı bir arayüz sunan Facade Pattern kullanmamı önerdi.

# 3. Kritik Analiz: AI'ın Yanlış/Eksik Önerisi ve Benim Müdahalem
- AI'ın verdiği Facade önerisinde mimari tasarım hatası tespit ettim ve bu öneriyi reddettim:

- AI'ın Tasarım Hatası: Facade örüntüsü, arkadaki karmaşık ve dağınık bir alt sistemi gizlemek amacıyla yeni ve basitleştirilmiş bir arayüz tasarlar. Ancak bizim projemizde yönetilmesi gereken karmaşık bir alt sistem grubu yok. Sadece tek bir harici sınıfın `LegacySmsApi` metot imzası uyuşmazlığı var.
- Benim  Müdahalem: Bizim sistemimiz halihazırda var olan `INotification` interface'ine bağlı çalışmak zorundadır. Hedef, mevcut çekirdek sınıfları değiştirmeden harici servisi çalışmaya hazır haline getirmek. Facade yeni bir interface yaratacağı için polimorfizmi bozar ve `NotificationFactory` ile entegre olamazdı.
- Sonuç: AI'ın hatalı Facade yönlendirmesini fark ederek Adapter Pattern'ı uyguladım. Mevcut interface'i taklit ederek köprüyü kurdum. Ayrıca sisteme esnek loglama yeteneği katmak için AI'ın akıl edemediği Decorator Pattern'ı ikinci structural desen olarak mimariye ekledim.