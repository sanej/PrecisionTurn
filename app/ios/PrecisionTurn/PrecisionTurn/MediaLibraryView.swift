//
//  MediaLibraryView.swift
//  PrecisionTurn
//
//  Created by Sanej Bandgar on 9/25/24.
//

import SwiftUI
import AVFoundation
import PhotosUI

struct MediaLibraryView: View {
    @State private var selectedImage: UIImage?
    @State private var isImagePickerPresented = false
    @State private var isVideoPickerPresented = false

    var body: some View {
        VStack {
            if let image = selectedImage {
                Image(uiImage: image)
                    .resizable()
                    .scaledToFit()
                    .frame(height: 300)
            }

            Button("Capture Photo") {
                isImagePickerPresented = true
            }
            .padding()

            Button("Capture Video") {
                isVideoPickerPresented = true
            }
            .padding()
        }
        .sheet(isPresented: $isImagePickerPresented) {
            ImagePicker(selectedImage: $selectedImage, isVideo: false)
        }
        .sheet(isPresented: $isVideoPickerPresented) {
            ImagePicker(selectedImage: $selectedImage, isVideo: true)
        }
    }
}

struct ImagePicker: UIViewControllerRepresentable {
    @Binding var selectedImage: UIImage?
    var isVideo: Bool

    func makeUIViewController(context: Context) -> UIImagePickerController {
        let picker = UIImagePickerController()
        picker.sourceType = .camera
        picker.mediaTypes = isVideo ? ["public.movie"] : ["public.image"]
        picker.delegate = context.coordinator
        return picker
    }

    func updateUIViewController(_ uiViewController: UIImagePickerController, context: Context) {}

    class Coordinator: NSObject, UIImagePickerControllerDelegate, UINavigationControllerDelegate {
        var parent: ImagePicker

        init(parent: ImagePicker) {
            self.parent = parent
        }

        func imagePickerController(_ picker: UIImagePickerController, didFinishPickingMediaWithInfo info: [UIImagePickerController.InfoKey: Any]) {
            if let image = info[.originalImage] as? UIImage {
                parent.selectedImage = image
            }
            picker.dismiss(animated: true)
        }
    }

    func makeCoordinator() -> Coordinator {
        Coordinator(parent: self)
    }
}

//Testing the view
#if DEBUG
struct MediaLibraryView_Previews: PreviewProvider {
    static var previews: some View {
        MediaLibraryView()
    }
}
#endif
