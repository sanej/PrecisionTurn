import SwiftUI
import Speech
import AVFoundation

struct NoteTakingView: View {
    @State private var recognizedText = ""
    @State private var isRecording = false
    private let speechRecognizer = SFSpeechRecognizer()
    private let audioEngine = AVAudioEngine()
    private let request = SFSpeechAudioBufferRecognitionRequest()

    var body: some View {
        VStack {
            Text("Voice Note")
                .font(.title)
                .padding()

            Text(recognizedText)
                .padding()

            Button(action: {
                isRecording ? stopRecording() : startRecording()
            }) {
                Text(isRecording ? "Stop Recording" : "Start Recording")
                    .padding()
                    .background(isRecording ? Color.red : Color.blue)
                    .foregroundColor(.white)
                    .cornerRadius(10)
            }
        }
    }

    func startRecording() {
        print("Starting speech recognition...")

        guard let speechRecognizer = SFSpeechRecognizer(), speechRecognizer.isAvailable else {
            print("Speech recognition is not available.")
            return
        }

        // Configure the audio session
        let audioSession = AVAudioSession.sharedInstance()
        do {
            try audioSession.setCategory(.record, mode: .measurement, options: .duckOthers)
            try audioSession.setActive(true, options: .notifyOthersOnDeactivation)
        } catch {
            print("Failed to configure audio session: \(error)")
            return
        }

        let inputNode = audioEngine.inputNode
        let recordingFormat = inputNode.outputFormat(forBus: 0)
        inputNode.installTap(onBus: 0, bufferSize: 1024, format: recordingFormat) { buffer, _ in
            self.request.append(buffer)
        }

        audioEngine.prepare()

        do {
            try audioEngine.start()
            isRecording = true
        } catch {
            print("Audio Engine couldn't start: \(error)")
            return
        }

        speechRecognizer.recognitionTask(with: request) { result, error in
            if let result = result {
                self.recognizedText = result.bestTranscription.formattedString
            } else if let error = error {
                print("Error in recognition: \(error.localizedDescription)")
            }
        }
    }

    private func stopRecording() {
        audioEngine.stop()
        audioEngine.inputNode.removeTap(onBus: 0)
        request.endAudio()
        isRecording = false

        // Deactivate the audio session
        let audioSession = AVAudioSession.sharedInstance()
        do {
            try audioSession.setActive(false, options: .notifyOthersOnDeactivation)
        } catch {
            print("Failed to deactivate audio session: \(error)")
        }
    }
}

// Run the previews

#if DEBUG
struct NoteTakingView_Previews: PreviewProvider {
    static var previews: some View {
        NoteTakingView()
    }
}
#endif
