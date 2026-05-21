``` mermaid
classDiagram
    class NotificationService {
        -emailApiKey: string
        -smsApiKey: string
        -pushApiKey: string
        +send(type, payload)
    }