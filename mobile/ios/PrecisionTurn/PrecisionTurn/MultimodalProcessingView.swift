//
//  MultimodalProcessingView.swift
//  PrecisionTurn
//
//  Created by Sanej Bandgar on 9/25/24.
//

import SwiftUI
import Foundation

struct AnalysisResponse: Decodable {
    let analysis: String
}

struct MultimodalProcessingView: View {
    @State private var image: UIImage?
    @State private var aiAnalysisResult = ""

    var body: some View {
        VStack {
            if let img = image {
                Image(uiImage: img)
                    .resizable()
                    .scaledToFit()
                    .frame(height: 300)
            }

            Button("Analyze Image with AI") {
                analyzeImageWithAI(image: image)
            }

            Text(aiAnalysisResult)
                .padding()
        }
    }

    func analyzeImageWithAI(image: UIImage?) {
        guard let img = image, let imageData = img.pngData() else { return }

        // Use your AI API call here (e.g., OpenAI or Google Gemini)
        let url = URL(string: "https://api.example.com/analyze")!
        var request = URLRequest(url: url)
        request.httpMethod = "POST"
        request.addValue("application/json", forHTTPHeaderField: "Content-Type")
        request.addValue("Bearer YOUR_API_KEY", forHTTPHeaderField: "Authorization")

        let body: [String: Any] = ["image": imageData.base64EncodedString()]
        request.httpBody = try? JSONSerialization.data(withJSONObject: body)

        URLSession.shared.dataTask(with: request) { data, response, error in
            guard let data = data, error == nil else {
                print("API call failed")
                return
            }

            if let result = try? JSONDecoder().decode(AnalysisResponse.self, from: data) {
                DispatchQueue.main.async {
                    aiAnalysisResult = result.analysis
                }
            } else {
                DispatchQueue.main.async {
                    aiAnalysisResult = "No result"
                }
            }
        }.resume()
    }
}

#if DEBUG
struct MultimodalProcessingView_Previews: PreviewProvider {
    static var previews: some View {
        MultimodalProcessingView()
    }
}
#endif
