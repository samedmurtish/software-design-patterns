```mermaid
classDiagram
    class NotificationService {
        +send(type, payload)
    }

    class NotificationFactory {
        +createNotification(type: string) : INotification
    }

    class INotification {
        +send(to: string, message: string, options?: any) : boolean
    }
    <<interface>> INotification

    class EmailNotification {
        +send(to, message, options) : boolean
    }
    class SmsNotification {
        +send(to, message, options) : boolean
    }
    class PushNotification {
        +send(to, message, options) : boolean
    }

    NotificationService --> NotificationFactory : Uses
    NotificationFactory --> INotification : Creates
    INotification <|-- EmailNotification : Implements
    INotification <|-- SmsNotification : Implements
    INotification <|-- PushNotification : Implements
