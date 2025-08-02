// Work Instruction Sheets Application
// This file contains the main JavaScript functionality for the WIS application

// Application state
let workInstructionSheets = [];
let currentView = 'loading';

// Initialize the application when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('main-container');
    if (container) {
        container.classList.add('visible');
        loadWorkInstructionSheets();
    }
});

/**
 * Load work instruction sheets data from JSON file
 */
async function loadWorkInstructionSheets() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        workInstructionSheets = await response.json();
        showSheetList();
    } catch (error) {
        console.error('Error loading work instruction sheets:', error);
        const loadingElement = document.getElementById('loading');
        if (loadingElement) {
            loadingElement.innerHTML = `
                <div class="text-center py-8">
                    <div class="text-red-500 text-6xl mb-4">⚠️</div>
                    <p class="text-red-600 font-semibold mb-2">Error loading data</p>
                    <p class="text-gray-600 text-sm">Please check if data.json file exists.</p>
                    <p class="text-gray-500 text-xs mt-2">Error details: ${error.message}</p>
                </div>
            `;
        }
    }
}

/**
 * Show the list view of all work instruction sheets
 */
function showSheetList() {
    currentView = 'list';

    // Hide other views
    hideElement('loading');
    hideElement('sheet-detail');
    showElement('sheet-list');

    // Generate sheet list HTML with Tailwind classes
    const sheetListContainer = document.getElementById('sheet-list');
    if (sheetListContainer && workInstructionSheets.length > 0) {
        sheetListContainer.innerHTML = workInstructionSheets.map(sheet => `
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer" data-sheet-id="${sheet.id}">
                <h3 class="text-xl font-semibold text-gray-800 mb-2">${escapeHtml(sheet.sheetName)}</h3>
                <p class="text-gray-600 mb-4 text-sm leading-relaxed">${escapeHtml(sheet.description)}</p>
                <button class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400" onclick="showSheetDetail('${sheet.id}')">
                    View Sheet Details →
                </button>
            </div>
        `).join('');
    } else if (sheetListContainer) {
        sheetListContainer.innerHTML = '<p class="text-center text-gray-500 py-8">No work instruction sheets available.</p>';
    }
}

/**
 * Show detail view for a specific work instruction sheet
 * @param {string} sheetId - The ID of the sheet to display
 */
function showSheetDetail(sheetId) {
    const sheet = workInstructionSheets.find(s => s.id === sheetId);
    if (!sheet) {
        console.error('Sheet not found:', sheetId);
        return;
    }

    currentView = 'detail';

    // Hide other views
    hideElement('loading');
    hideElement('sheet-list');
    showElement('sheet-detail');

    // Populate detail view
    const detailTitle = document.getElementById('detail-title');
    const detailDescription = document.getElementById('detail-description');
    const pdfLink = document.getElementById('pdf-link');
    const videoSource = document.getElementById('video-source');
    const instructionVideo = document.getElementById('instruction-video');

    if (detailTitle) detailTitle.textContent = sheet.sheetName;
    if (detailDescription) detailDescription.textContent = sheet.description;
    if (pdfLink) pdfLink.href = sheet.pdfLink;
    if (videoSource) videoSource.src = sheet.videoLink;

    // Reload the video to reflect the new source
    if (instructionVideo) {
        instructionVideo.load();
    }

    // Update page URL for better UX (optional)
    if (history.pushState) {
        history.pushState({ view: 'detail', sheetId: sheetId }, '', `#${sheetId}`);
    }
}

/**
 * Navigate back to the sheet list
 */
function goBackToList() {
    showSheetList();

    // Update URL
    if (history.pushState) {
        history.pushState({ view: 'list' }, '', window.location.pathname);
    }
}

/**
 * Handle browser back/forward button navigation
 */
window.addEventListener('popstate', function (event) {
    if (event.state) {
        if (event.state.view === 'detail' && event.state.sheetId) {
            showSheetDetail(event.state.sheetId);
        } else if (event.state.view === 'list') {
            showSheetList();
        }
    } else {
        // No state, assume we want to show the list
        showSheetList();
    }
});

/**
 * Utility function to hide an element using Tailwind classes
 * @param {string} elementId - The ID of the element to hide
 */
function hideElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add('hidden');
        element.classList.remove('block');
    }
}

/**
 * Utility function to show an element using Tailwind classes
 * @param {string} elementId - The ID of the element to show
 */
function showElement(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.remove('hidden');
        element.classList.add('block');
    }
}

/**
 * Utility function to escape HTML to prevent XSS
 * @param {string} text - The text to escape
 * @returns {string} - The escaped text
 */
function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

/**
 * Add keyboard navigation support
 */
document.addEventListener('keydown', function (event) {
    // Escape key to go back to list from detail view
    if (event.key === 'Escape' && currentView === 'detail') {
        goBackToList();
    }
});

// Make functions available globally for inline event handlers
window.showSheetDetail = showSheetDetail;
window.showSheetList = showSheetList;
window.goBackToList = goBackToList;