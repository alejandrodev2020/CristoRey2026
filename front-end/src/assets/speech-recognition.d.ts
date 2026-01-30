interface SpeechRecognition {
    new (): SpeechRecognition; // Constructor
    lang: string; // Propiedad de lenguaje
    interimResults: boolean; // Propiedad para resultados intermedios
    start(): void; // Método para empezar
    stop(): void; // Método para detener
    onresult: (event: any) => void; // Manejar resultados
    onend: () => void; // Manejar fin
}