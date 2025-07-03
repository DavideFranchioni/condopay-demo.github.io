// CondoPay App Demo - Mock Data
// Dati di esempio realistici per l'applicativo demo

const CONDOPAY_MOCK_DATA = {
    // ===== USER DATA =====
    currentUser: {
        id: 1,
        name: "Marco Rossi",
        email: "admin@studiorossi.it",
        role: "admin",
        company: "Studio Amministrazioni Rossi",
        avatar: "MR",
        phone: "+39 02 1234 5678",
        joinDate: "2023-01-15",
        permissions: ["all"]
    },

    // ===== DASHBOARD STATS =====
    dashboardStats: {
        monthlyVolume: 185420,
        paymentRate: 94.2,
        defaultRate: 3.1,
        totalCondos: 25,
        totalUnits: 847,
        dailyPayments: 12450,
        pendingPayments: 8920,
        overduePayments: 3200,
        commissions: 127.50
    },

    // ===== CONDOMINIUM DATA =====
    condominiums: [
        {
            id: 1,
            name: "Residenza Milano Centro",
            address: "Via Brera 15, Milano",
            city: "Milano",
            zipCode: "20121",
            units: 45,
            totalValue: 2800000,
            monthlyAmount: 18500,
            paymentRate: 97.8,
            defaultingUnits: 1,
            status: "excellent",
            administrator: "Marco Rossi",
            yearBuilt: 1985,
            elevator: true,
            parking: true,
            garden: false,
            lastSync: "2025-07-03T14:30:00Z",
            nextAssembly: "2025-07-15"
        },
        {
            id: 2,
            name: "Palazzo Navigli", 
            address: "Corso di Porta Ticinese 87, Milano",
            city: "Milano",
            zipCode: "20123",
            units: 32,
            totalValue: 1960000,
            monthlyAmount: 12800,
            paymentRate: 100.0,
            defaultingUnits: 0,
            status: "excellent",
            administrator: "Marco Rossi",
            yearBuilt: 1920,
            elevator: true,
            parking: false,
            garden: true,
            lastSync: "2025-07-03T14:25:00Z",
            nextAssembly: "2025-08-02"
        },
        {
            id: 3,
            name: "Condominio Porta Nuova",
            address: "Via Melchiorre Gioia 22, Milano",
            city: "Milano", 
            zipCode: "20124",
            units: 78,
            totalValue: 4680000,
            monthlyAmount: 31200,
            paymentRate: 89.7,
            defaultingUnits: 8,
            status: "warning",
            administrator: "Marco Rossi",
            yearBuilt: 2010,
            elevator: true,
            parking: true,
            garden: true,
            lastSync: "2025-07-03T14:20:00Z",
            nextAssembly: "2025-07-20"
        },
        {
            id: 4,
            name: "Residenza Sempione",
            address: "Viale Certosa 45, Milano",
            city: "Milano",
            zipCode: "20155",
            units: 28,
            totalValue: 1680000,
            monthlyAmount: 9800,
            paymentRate: 92.9,
            defaultingUnits: 2,
            status: "good",
            administrator: "Marco Rossi",
            yearBuilt: 1975,
            elevator: true,
            parking: true,
            garden: false,
            lastSync: "2025-07-03T14:15:00Z",
            nextAssembly: "2025-07-25"
        },
        {
            id: 5,
            name: "Palazzo San Siro",
            address: "Via Harar 16, Milano",
            city: "Milano",
            zipCode: "20151", 
            units: 52,
            totalValue: 2080000,
            monthlyAmount: 15600,
            paymentRate: 84.6,
            defaultingUnits: 8,
            status: "critical",
            administrator: "Marco Rossi",
            yearBuilt: 1960,
            elevator: false,
            parking: true,
            garden: false,
            lastSync: "2025-07-03T14:10:00Z",
            nextAssembly: "2025-07-10"
        }
    ],

    // ===== RESIDENTS DATA =====
    residents: [
        {
            id: 1,
            condominiumId: 1,
            unit: "Apt. 12A",
            floor: 3,
            owner: "Giuseppe Verdi",
            email: "g.verdi@email.it",
            phone: "+39 333 1234567",
            monthlyFee: 245.50,
            paymentStatus: "paid",
            lastPayment: "2025-07-01",
            balance: 0,
            joinDate: "2020-03-15"
        },
        {
            id: 2,
            condominiumId: 1,
            unit: "Apt. 8B",
            floor: 2,
            owner: "Maria Bianchi",
            email: "m.bianchi@email.it", 
            phone: "+39 333 2345678",
            monthlyFee: 280.00,
            paymentStatus: "pending",
            lastPayment: "2025-06-01",
            balance: -280.00,
            joinDate: "2019-09-10"
        },
        {
            id: 3,
            condominiumId: 2,
            unit: "Apt. 3B",
            floor: 1,
            owner: "Franco Neri",
            email: "f.neri@email.it",
            phone: "+39 333 3456789",
            monthlyFee: 180.00,
            paymentStatus: "paid",
            lastPayment: "2025-07-02",
            balance: 0,
            joinDate: "2021-01-20"
        },
        {
            id: 4,
            condominiumId: 3,
            unit: "Apt. 15C",
            floor: 4,
            owner: "Laura Rossi",
            email: "l.rossi@email.it",
            phone: "+39 333 4567890",
            monthlyFee: 320.75,
            paymentStatus: "overdue",
            lastPayment: "2025-05-01",
            balance: -641.50,
            joinDate: "2018-06-05"
        }
    ],

    // ===== PAYMENTS DATA =====
    payments: [
        {
            id: "TXN001",
            condominiumId: 1,
            residentId: 1,
            amount: 245.50,
            date: "2025-07-03T10:30:00Z",
            dueDate: "2025-07-01",
            status: "completed",
            method: "stripe",
            transactionId: "pi_1234567890",
            commission: 2.45,
            description: "Spese condominiali Luglio 2025"
        },
        {
            id: "TXN002",
            condominiumId: 2,
            residentId: 3,
            amount: 180.00,
            date: "2025-07-02T15:45:00Z",
            dueDate: "2025-07-01",
            status: "completed", 
            method: "stripe",
            transactionId: "pi_0987654321",
            commission: 1.80,
            description: "Spese condominiali Luglio 2025"
        },
        {
            id: "TXN003",
            condominiumId: 3,
            residentId: 4,
            amount: 320.75,
            date: "2025-07-02T09:20:00Z",
            dueDate: "2025-07-01",
            status: "pending",
            method: "bank_transfer",
            transactionId: null,
            commission: 0,
            description: "Spese condominiali Luglio 2025"
        },
        {
            id: "TXN004",
            condominiumId: 1,
            residentId: 2,
            amount: 280.00,
            date: "2025-06-15T11:10:00Z",
            dueDate: "2025-06-01",
            status: "failed",
            method: "stripe",
            transactionId: "pi_1111111111",
            commission: 0,
            description: "Spese condominiali Giugno 2025"
        }
    ],

    // ===== COMMUNICATIONS DATA =====
    communications: [
        {
            id: 1,
            type: "reminder",
            title: "Sollecito di Pagamento",
            message: "Gentile condomino, la informiamo che il pagamento delle spese condominiali per il mese di Luglio 2025 risulta scaduto.",
            condominiumId: 3,
            recipientType: "residents",
            recipients: [4],
            sentDate: "2025-07-03T09:00:00Z",
            sentBy: "Marco Rossi",
            channel: "email",
            status: "sent"
        },
        {
            id: 2,
            type: "notice",
            title: "Assemblea Condominiale",
            message: "Si comunica che l'assemblea condominiale si terrà il giorno 15 Luglio 2025 alle ore 18:00 presso la sala comune.",
            condominiumId: 1,
            recipientType: "all",
            recipients: [],
            sentDate: "2025-07-01T16:00:00Z",
            sentBy: "Marco Rossi",
            channel: "email_sms",
            status: "sent"
        },
        {
            id: 3,
            type: "maintenance",
            title: "Lavori di Manutenzione",
            message: "Si informa che dal 10 al 12 Luglio verranno effettuati lavori di manutenzione all'ascensore. Durante questo periodo l'ascensore non sarà disponibile.",
            condominiumId: 2,
            recipientType: "all",
            recipients: [],
            sentDate: "2025-07-02T10:30:00Z",
            sentBy: "Marco Rossi",
            channel: "whatsapp",
            status: "scheduled"
        }
    ],

    // ===== RECENT ACTIVITY =====
    recentActivity: [
        {
            id: 1,
            type: "payment",
            title: "Pagamento Ricevuto",
            description: "Residenza Milano Centro - Apt. 12A",
            timestamp: "2025-07-03T10:30:00Z",
            amount: 245.50,
            userId: 1
        },
        {
            id: 2,
            type: "alert",
            title: "Sollecito Automatico Inviato",
            description: "3 unità in Palazzo San Siro",
            timestamp: "2025-07-03T09:15:00Z",
            count: 3,
            userId: 1
        },
        {
            id: 3,
            type: "system",
            title: "Sincronizzazione Completata",
            description: "Aggiornamento dati Domu Studio",
            timestamp: "2025-07-03T08:45:00Z",
            condosCount: 5,
            userId: 1
        },
        {
            id: 4,
            type: "payment",
            title: "Pagamento Ricevuto",
            description: "Palazzo Navigli - Apt. 3B",
            timestamp: "2025-07-02T15:45:00Z",
            amount: 180.00,
            userId: 1
        },
        {
            id: 5,
            type: "notification",
            title: "Nuovo Residente Registrato",
            description: "Condominio Porta Nuova - Apt. 22A",
            timestamp: "2025-07-02T14:20:00Z",
            userId: 1
        }
    ],

    // ===== REPORTS DATA =====
    reports: {
        monthlyTrends: [
            { month: "Gen", income: 175000, target: 180000, paymentRate: 97.2, defaults: 5.1 },
            { month: "Feb", income: 180500, target: 182000, paymentRate: 99.2, defaults: 3.8 },
            { month: "Mar", income: 183200, target: 185000, paymentRate: 99.0, defaults: 3.2 },
            { month: "Apr", income: 185600, target: 188000, paymentRate: 98.7, defaults: 2.9 },
            { month: "Mag", income: 189200, target: 190000, paymentRate: 99.6, defaults: 2.5 },
            { month: "Giu", income: 185420, target: 185000, paymentRate: 94.2, defaults: 3.1 }
        ],
        paymentMethods: [
            { method: "Stripe", percentage: 75, volume: 139065 },
            { method: "Bonifico", percentage: 20, volume: 37084 },
            { method: "Contanti", percentage: 5, volume: 9271 }
        ],
        condominiumPerformance: [
            { id: 1, name: "Residenza Milano Centro", score: 9.5, trend: "up" },
            { id: 2, name: "Palazzo Navigli", score: 10.0, trend: "stable" },
            { id: 3, name: "Condominio Porta Nuova", score: 7.8, trend: "down" },
            { id: 4, name: "Residenza Sempione", score: 8.9, trend: "up" },
            { id: 5, name: "Palazzo San Siro", score: 6.2, trend: "down" }
        ]
    },

    // ===== INTEGRATIONS DATA =====
    integrations: [
        {
            id: "domu",
            name: "Domu Studio",
            description: "Integrazione con il software gestionale Domu Studio per sincronizzazione automatica dei dati",
            status: "connected",
            lastSync: "2025-07-03T14:30:00Z",
            syncFrequency: "hourly",
            dataTypes: ["residents", "payments", "units"],
            apiKey: "ds_live_****7890",
            webhookUrl: "https://api.condopay.it/webhooks/domu"
        },
        {
            id: "stripe",
            name: "Stripe",
            description: "Gateway di pagamento per elaborazione carte di credito e debito",
            status: "connected",
            lastSync: "2025-07-03T14:35:00Z",
            syncFrequency: "realtime",
            dataTypes: ["payments", "refunds"],
            apiKey: "sk_live_****1234",
            webhookUrl: "https://api.condopay.it/webhooks/stripe"
        },
        {
            id: "twilio",
            name: "Twilio SMS",
            description: "Servizio per invio SMS e notifiche WhatsApp Business",
            status: "connected",
            lastSync: "2025-07-03T14:00:00Z",
            syncFrequency: "ondemand",
            dataTypes: ["sms", "whatsapp"],
            apiKey: "AC****5678",
            webhookUrl: "https://api.condopay.it/webhooks/twilio"
        },
        {
            id: "mailgun",
            name: "Mailgun",
            description: "Servizio email per invio comunicazioni e solleciti automatici",
            status: "connected",
            lastSync: "2025-07-03T13:45:00Z",
            syncFrequency: "ondemand", 
            dataTypes: ["emails"],
            apiKey: "key-****9012",
            webhookUrl: "https://api.condopay.it/webhooks/mailgun"
        },
        {
            id: "sumsub",
            name: "Sumsub KYC",
            description: "Verifica identità per compliance KYC/AML",
            status: "connected",
            lastSync: "2025-07-03T12:00:00Z",
            syncFrequency: "ondemand",
            dataTypes: ["kyc", "documents"],
            apiKey: "sbx:****3456",
            webhookUrl: "https://api.condopay.it/webhooks/sumsub"
        }
    ],

    // ===== SETTINGS DATA =====
    settings: {
        general: {
            companyName: "Studio Amministrazioni Rossi",
            companyAddress: "Via Brera 15, 20121 Milano",
            companyPhone: "+39 02 1234 5678",
            companyEmail: "info@studiorossi.it",
            companyVat: "IT12345678901",
            timezone: "Europe/Rome",
            language: "it",
            currency: "EUR"
        },
        payments: {
            defaultDueDate: 1, // 1st of month
            reminderDays: [7, 3, 1], // days before due date
            lateFeePercentage: 2.0,
            maxLateDays: 30,
            stripeCommission: 1.4,
            bankTransferFee: 0.0
        },
        notifications: {
            emailEnabled: true,
            smsEnabled: true,
            whatsappEnabled: true,
            reminderFrequency: "daily",
            escalationEnabled: true,
            escalationDays: [30, 60, 90]
        },
        security: {
            twoFactorEnabled: false,
            sessionTimeout: 480, // minutes
            maxLoginAttempts: 5,
            passwordExpiry: 90, // days
            ipWhitelist: [],
            auditLogEnabled: true
        }
    },

    // ===== AUDIT LOG =====
    auditLog: [
        {
            id: 1,
            timestamp: "2025-07-03T14:30:00Z",
            userId: 1,
            action: "payment_received",
            resource: "payment",
            resourceId: "TXN001",
            details: "Pagamento di €245.50 ricevuto da Giuseppe Verdi",
            ipAddress: "192.168.1.100",
            userAgent: "Mozilla/5.0..."
        },
        {
            id: 2,
            timestamp: "2025-07-03T09:15:00Z",
            userId: 1,
            action: "reminder_sent",
            resource: "communication",
            resourceId: "1",
            details: "Sollecito inviato a 3 condomini in Palazzo San Siro",
            ipAddress: "192.168.1.100",
            userAgent: "Mozilla/5.0..."
        },
        {
            id: 3,
            timestamp: "2025-07-03T08:45:00Z",
            userId: null,
            action: "sync_completed",
            resource: "integration",
            resourceId: "domu",
            details: "Sincronizzazione Domu Studio completata per 5 condomini",
            ipAddress: "127.0.0.1",
            userAgent: "CondoPay-Sync/1.0"
        }
    ],

    // ===== NOTIFICATIONS =====
    notifications: [
        {
            id: 1,
            type: "payment",
            title: "Nuovo Pagamento",
            message: "Ricevuto pagamento di €245.50 da Giuseppe Verdi",
            timestamp: "2025-07-03T10:30:00Z",
            read: false,
            actionUrl: "/payments/TXN001"
        },
        {
            id: 2,
            type: "alert",
            title: "Pagamento Scaduto",
            message: "2 pagamenti scaduti in Palazzo San Siro necessitano attenzione",
            timestamp: "2025-07-03T09:00:00Z",
            read: false,
            actionUrl: "/condominiums/5"
        },
        {
            id: 3,
            type: "system",
            title: "Sync Completata",
            message: "Sincronizzazione con Domu Studio completata con successo",
            timestamp: "2025-07-03T08:45:00Z",
            read: true,
            actionUrl: "/integrations/domu"
        }
    ]
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = CONDOPAY_MOCK_DATA;
}

// Global variable for browser usage
if (typeof window !== 'undefined') {
    window.CONDOPAY_MOCK_DATA = CONDOPAY_MOCK_DATA;
}