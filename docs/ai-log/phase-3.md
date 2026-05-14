# 1. Oturum Özeti & Tartışılan Konular
- Bu oturumda sistemin genişletilebilirliğini tavan yaptırmak adına Strategy ve Observer pattern'ları üzerine pair programming yapıldı. 
- Bildirimlerin öncelik ve kuyruklama mekanizmaları için `Strategy Pattern` mimarisi kuruldu.
- Gönderim sonrası tetiklenecek yan süreçleri (Analytics, AuditLog) ayırmak için `Observer Pattern` entegre edildi.

# 2. AI Olmadan Bu Faz Ne Kadar Sürerdi?
AI olmadan bu fazın sıfırdan tasarlanması, middleware mantığındaki `next: () => void` asenkron callback yapısının hatasız kurgulanması ve event bazlı çalışan bir `NotificationSubject` yazılması yaklaşık 3 ila 4 saat arası bir araştırma ve bug-fixing süreci gerektirirdi. AI ile bu süreyi 30 dakikaya indirerek mimari tasarıma odaklandım.

# 3. AI Sizi Nerede Yanılttı?
* AI'ın Hatası: AI, Observer örüntüsünü kurarken ilk başta `NotificationService` sınıfının içinde statik bir listener dizisi tutmayı ve bağımlılıkları doğrudan servis constructor'ında ayağa kaldırmayı önerdi.
* Benim Müdahalem: Bu durum `NotificationService` sınıfını hem dinleyicilere bağımlı hale getiriyordu hem de OCP prensibini tamamen eziyordu. AI'a müdahale ederek, dinleyicilerin dışarıdan `attach` yöntemiyle dinamik olarak çalışma zamanında bağlanacağı soyut bir `NotificationSubject` taban sınıfı yazdırdım. Servisi bu sınıftan türeterek esnekliği korudum.