new Vue({
    el: '#app',
    data: {
        map: null,
        selectedLayer: 'default',
        searchQuery: '',
        facilities: [
            {
                name: "Phillips 66 San Francisco Refinery",
                address: "1290 San Pablo Ave, Rodeo, CA 94572",
                coordinates: { lat: 38.0347, lng: -122.2654 }
            },
            // Add more facilities here
        ]
    },
    methods: {
        async fetchToken() {
            if (this.token) {
                return this.token; // Return the existing token if it exists
            }
            try {
              const response = await fetch(window.config.endpoints.generateToken);
              //const response = await fetch('http://localhost:8001/generate-token');
              const data = await response.json();
              this.token = data.token; // Store the fetched token
              console.log('Token fetched:', this.token); // Log the fetched token
            return this.token;
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        },
        async initializeMap() {
          const token = await this.fetchToken();  
          if (!token) {
              console.error('Token is not available');
              return;
          }
          console.log('Initializing map with token:', token);
          try {
                mapkit.init({
                    authorizationCallback: (done) => {
                        done(token); // Use the fetched token
                    }
                });
                this.map = new mapkit.Map('mapView');
                console.log('Map initialized:', this.map);
                  
                // Add a marker for the refinery
                const refineryCoordinates = new mapkit.Coordinate(38.0347, -122.2654); // Example coordinates for Bay Area
                const refineryAnnotation = new mapkit.MarkerAnnotation(refineryCoordinates, {
                          title: "Phillips 66",
                          subtitle: "San Francisco Refinery"
                });
                this.map.showItems([refineryAnnotation]);
            } catch (error) {
                console.error('Error initializing map:', error);
            }
        },
        updateMapLayer() {
            // Logic to update map based on selected layer
            if (this.selectedLayer === 'default') {
                this.map.showMapType(mapkit.Map.MapTypes.standard);
            } else if (this.selectedLayer === 'satellite') {
                this.map.showMapType(mapkit.Map.MapTypes.satellite);
            }
        },
        searchMap() {
            // Logic to search and update map based on query
            const facility = this.facilities.find(f => f.name.toLowerCase().includes(this.searchQuery.toLowerCase()));
            if (facility) {
                const coordinates = new mapkit.Coordinate(facility.coordinates.lat, facility.coordinates.lng);
                this.map.setCenterAnimated(coordinates);
            }
        }
    },
    mounted() {
        this.initializeMap();
    }
});