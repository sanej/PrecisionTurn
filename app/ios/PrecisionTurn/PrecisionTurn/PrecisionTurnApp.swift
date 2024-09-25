//
//  PrecisionTurnApp.swift
//  PrecisionTurn
//
//  Created by Sanej Bandgar on 9/25/24.
//

import SwiftUI
import SwiftData

@main
struct PrecisionTurnApp: App {
    var sharedModelContainer: ModelContainer = {
        let schema = Schema([
            Item.self,
        ])
        let modelConfiguration = ModelConfiguration(schema: schema, isStoredInMemoryOnly: false)
        
        do {
            return try ModelContainer(for: schema, configurations: [modelConfiguration])
        } catch {
            fatalError("Could not create ModelContainer: \(error)")
        }
    }()
    
    var body: some Scene {
        WindowGroup {
            TabView {
                NoteTakingView()
                    .tabItem {
                        Label("Notes", systemImage: "pencil")
                    }
                MediaLibraryView()
                    .tabItem {
                        Label("Library", systemImage: "photo")
                    }
                MultimodalProcessingView()
                    .tabItem {
                        Label("Processing", systemImage: "wand.and.stars")
                    }
            }
            .modelContainer(sharedModelContainer)
        }
    }
}

