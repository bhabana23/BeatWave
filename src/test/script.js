document.addEventListener('DOMContentLoaded', function() {
    // Sidebar functionality
    const sidebar = document.getElementById('sidebar');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    // Mobile menu toggle
    if (mobileMenuBtn) {
      mobileMenuBtn.addEventListener('click', function() {
        sidebar.classList.toggle('mobile-open');
      });
    }
    
    // Music player functionality
    const playPauseBtn = document.getElementById('playPauseBtn');
    const likeBtn = document.getElementById('likeBtn');
    const progress = document.getElementById('progress');
    const progressHandle = document.getElementById('progressHandle');
    const progressBar = document.querySelector('.progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    const volumeLevel = document.getElementById('volumeLevel');
    const volumeHandle = document.getElementById('volumeHandle');
    const volumeBar = document.querySelector('.volume-bar');
    
    // Play/Pause toggle
    if (playPauseBtn) {
      playPauseBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-play')) {
          icon.classList.remove('fa-play');
          icon.classList.add('fa-pause');
          startProgressSimulation();
        } else {
          icon.classList.remove('fa-pause');
          icon.classList.add('fa-play');
          stopProgressSimulation();
        }
      });
    }
    
    // Like button toggle
    if (likeBtn) {
      likeBtn.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('far')) {
          icon.classList.remove('far');
          icon.classList.add('fas');
          this.classList.add('active');
        } else {
          icon.classList.remove('fas');
          icon.classList.add('far');
          this.classList.remove('active');
        }
      });
    }
    
    // Progress bar functionality
    if (progressBar) {
      progressBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = (x / width) * 100;
        
        progress.style.width = `${percentage}%`;
        progressHandle.style.left = `${percentage}%`;
        
        // Update time display
        const totalSeconds = 200; // 3:20 in seconds
        const currentSeconds = Math.floor((percentage / 100) * totalSeconds);
        currentTimeEl.textContent = formatTime(currentSeconds);
      });
    }
    
    // Volume bar functionality
    if (volumeBar) {
      volumeBar.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const width = rect.width;
        const percentage = (x / width) * 100;
        
        volumeLevel.style.width = `${percentage}%`;
        volumeHandle.style.left = `${percentage}%`;
      });
    }
    
    // Carousel functionality
    const artistsCarousel = document.getElementById('artistsCarousel');
    const artistPrev = document.getElementById('artistPrev');
    const artistNext = document.getElementById('artistNext');
    
    const playlistsCarousel = document.getElementById('playlistsCarousel');
    const playlistPrev = document.getElementById('playlistPrev');
    const playlistNext = document.getElementById('playlistNext');
    
    // Artists carousel navigation
    if (artistsCarousel && artistPrev && artistNext) {
      artistPrev.addEventListener('click', function() {
        artistsCarousel.querySelector('.carousel-track').scrollBy({
          left: -artistsCarousel.clientWidth / 2,
          behavior: 'smooth'
        });
      });
      
      artistNext.addEventListener('click', function() {
        artistsCarousel.querySelector('.carousel-track').scrollBy({
          left: artistsCarousel.clientWidth / 2,
          behavior: 'smooth'
        });
      });
    }
    
    // Playlists carousel navigation
    if (playlistsCarousel && playlistPrev && playlistNext) {
      playlistPrev.addEventListener('click', function() {
        playlistsCarousel.querySelector('.carousel-track').scrollBy({
          left: -playlistsCarousel.clientWidth / 2,
          behavior: 'smooth'
        });
      });
      
      playlistNext.addEventListener('click', function() {
        playlistsCarousel.querySelector('.carousel-track').scrollBy({
          left: playlistsCarousel.clientWidth / 2,
          behavior: 'smooth'
        });
      });
    }
    
    // Progress simulation
    let progressInterval;
    let currentProgress = 30; // Starting at 30%
    
    function startProgressSimulation() {
      if (progressInterval) clearInterval(progressInterval);
      
      progressInterval = setInterval(() => {
        currentProgress += 0.5;
        if (currentProgress >= 100) {
          currentProgress = 0;
          clearInterval(progressInterval);
          
          // Reset play button
          const icon = playPauseBtn.querySelector('i');
          icon.classList.remove('fa-pause');
          icon.classList.add('fa-play');
        }
        
        // Update progress bar
        progress.style.width = `${currentProgress}%`;
        progressHandle.style.left = `${currentProgress}%`;
        
        // Update time display
        const totalSeconds = 200; // 3:20 in seconds
        const currentSeconds = Math.floor((currentProgress / 100) * totalSeconds);
        currentTimeEl.textContent = formatTime(currentSeconds);
      }, 500);
    }
    
    function stopProgressSimulation() {
      clearInterval(progressInterval);
    }
    
    // Format time in MM:SS
    function formatTime(seconds) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }
    
    // Handle window resize for responsive behavior
    window.addEventListener('resize', function() {
      if (window.innerWidth > 768) {
        sidebar.classList.remove('mobile-open');
      }
    });
  });