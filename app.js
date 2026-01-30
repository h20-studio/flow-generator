// ===== FlowPrompt - Simple Version =====

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    console.log('FlowPrompt initialized');

    // ===== DOM Elements =====
    const generateBtn = document.getElementById('generateBtn');
    const outputSection = document.getElementById('outputSection');
    const promptsContainer = document.getElementById('promptsContainer');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const toast = document.getElementById('toast');
    const langBtns = document.querySelectorAll('.lang-btn');

    // Form inputs
    const characterSelect = document.getElementById('characterSelect');
    const characterInput = document.getElementById('characterInput');
    const costumeInput = document.getElementById('costumeInput');
    const locationSelect = document.getElementById('locationSelect');
    const locationInput = document.getElementById('locationInput');
    const dialogueSelect = document.getElementById('dialogueSelect');
    const dialogueInput = document.getElementById('dialogueInput');
    const sceneCountSelect = document.getElementById('sceneCountSelect');
    const timeSelect = document.getElementById('timeSelect');
    const videoTitleInput = document.getElementById('videoTitleInput');
    const secondaryInput = document.getElementById('secondaryInput');
    const speechTextInput = document.getElementById('speechTextInput');
    const dialogueLanguageSelect = document.getElementById('dialogueLanguageSelect');

    // Image uploads
    const uploadArea1 = document.getElementById('uploadArea1');
    const imageInput1 = document.getElementById('imageInput1');
    const uploadContent1 = document.getElementById('uploadContent1');
    const imagePreview1 = document.getElementById('imagePreview1');
    const previewImg1 = document.getElementById('previewImg1');
    const removeImage1 = document.getElementById('removeImage1');

    const uploadArea2 = document.getElementById('uploadArea2');
    const imageInput2 = document.getElementById('imageInput2');
    const uploadContent2 = document.getElementById('uploadContent2');
    const imagePreview2 = document.getElementById('imagePreview2');
    const previewImg2 = document.getElementById('previewImg2');
    const removeImage2 = document.getElementById('removeImage2');

    let currentLanguage = 'en';

    // ===== Character Presets =====
    const characterPresets = {
        'young-woman': 'a beautiful young woman in her twenties',
        'young-man': 'a handsome young man in his twenties',
        'mature-woman': 'an elegant mature woman in her forties',
        'mature-man': 'a distinguished mature man in his forties',
        'teen-girl': 'a teenage girl around 16 years old',
        'teen-boy': 'a teenage boy around 16 years old',
        'elderly-woman': 'an elegant elderly woman',
        'elderly-man': 'a distinguished elderly man',
        'child-girl': 'a young girl around 10 years old',
        'child-boy': 'a young boy around 10 years old'
    };

    // ===== Location Presets =====
    const locationPresets = {
        'beach': 'at a beautiful beach with ocean waves and golden sand',
        'cafe': 'inside a cozy cafe with warm lighting',
        'park': 'in a peaceful park with green trees',
        'urban': 'on a modern city street',
        'forest': 'in a natural forest with tall trees',
        'mountain': 'on scenic mountains with beautiful views',
        'studio': 'in a professional studio with clean background',
        'home': 'inside a comfortable home interior',
        'office': 'in a professional office workspace'
    };

    // ===== Dialogue Presets =====
    const dialoguePresets = {
        'talking': 'having a conversation together',
        'laughing': 'laughing and smiling joyfully',
        'walking': 'walking side by side',
        'holding-hands': 'holding hands romantically',
        'hugging': 'embracing in a warm hug',
        'looking': 'gazing at each other',
        'dancing': 'dancing together gracefully',
        'eating': 'enjoying a meal together'
    };

    // ===== Scene Types =====
    const sceneTypes = ['Opening Shot', 'Build-up', 'Development', 'Climax', 'Closing Shot'];

    // ===== Camera Movements =====
    const cameras = [
        'slow cinematic pan',
        'smooth dolly shot',
        'gentle zoom',
        'tracking shot following movement',
        'slow motion capture'
    ];

    // ===== Time Lighting =====
    const timeLighting = {
        'day': 'bright natural daylight',
        'golden': 'warm golden hour lighting',
        'night': 'atmospheric night lighting with city lights',
        'morning': 'soft morning light',
        'overcast': 'soft diffused light'
    };

    // ===== Image Upload Handlers =====
    function setupImageUpload(area, input, content, preview, img, removeBtn) {
        if (!area || !input) return;

        area.addEventListener('click', () => input.click());

        area.addEventListener('dragover', (e) => {
            e.preventDefault();
            area.classList.add('dragover');
        });

        area.addEventListener('dragleave', () => {
            area.classList.remove('dragover');
        });

        area.addEventListener('drop', (e) => {
            e.preventDefault();
            area.classList.remove('dragover');
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                handleImage(file, content, preview, img);
            }
        });

        input.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                handleImage(file, content, preview, img);
            }
        });

        if (removeBtn) {
            removeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                input.value = '';
                if (content) content.style.display = 'flex';
                if (preview) preview.style.display = 'none';
            });
        }
    }

    function handleImage(file, content, preview, img) {
        const reader = new FileReader();
        reader.onload = (e) => {
            if (img) img.src = e.target.result;
            if (content) content.style.display = 'none';
            if (preview) preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
    }

    // Setup both image uploads
    setupImageUpload(uploadArea1, imageInput1, uploadContent1, imagePreview1, previewImg1, removeImage1);
    setupImageUpload(uploadArea2, imageInput2, uploadContent2, imagePreview2, previewImg2, removeImage2);

    // ===== Custom Input Toggle =====
    function setupCustomToggle(select, input) {
        if (!select || !input) return;
        select.addEventListener('change', function () {
            if (this.value === 'custom') {
                input.style.display = 'block';
                input.focus();
            } else {
                input.style.display = 'none';
            }
        });
    }

    setupCustomToggle(characterSelect, characterInput);
    setupCustomToggle(locationSelect, locationInput);
    setupCustomToggle(dialogueSelect, dialogueInput);

    // ===== Language Switcher =====
    langBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            langBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentLanguage = btn.dataset.lang;
        });
    });

    // ===== Generate Button =====
    if (generateBtn) {
        generateBtn.addEventListener('click', function () {
            console.log('Generate button clicked');
            generatePrompts();
        });
    }

    // ===== Copy All Button =====
    if (copyAllBtn) {
        copyAllBtn.addEventListener('click', function () {
            const prompts = promptsContainer.querySelectorAll('.prompt-text');
            let allText = '';
            prompts.forEach((p, i) => {
                allText += `Scene ${i + 1}:\n${p.textContent}\n\n`;
            });
            copyToClipboard(allText.trim());
            showToast('All prompts copied!');
        });
    }

    // ===== Generate Prompts Function =====
    function generatePrompts() {
        console.log('Generating prompts...');

        // Get character
        let character = '';
        const charValue = characterSelect ? characterSelect.value : 'young-woman';
        if (charValue === 'custom' && characterInput) {
            character = characterInput.value.trim() || 'a person';
        } else {
            character = characterPresets[charValue] || 'a beautiful young woman';
        }

        // Get costume
        const costume = costumeInput ? costumeInput.value.trim() : '';

        // Get location
        let location = '';
        const locValue = locationSelect ? locationSelect.value : '';
        if (locValue === 'custom' && locationInput) {
            location = locationInput.value.trim();
        } else if (locValue) {
            location = locationPresets[locValue] || locValue;
        }

        // Get dialogue/interaction
        let dialogue = '';
        const dialogValue = dialogueSelect ? dialogueSelect.value : '';
        if (dialogValue === 'custom' && dialogueInput) {
            dialogue = dialogueInput.value.trim();
        } else if (dialogValue) {
            dialogue = dialoguePresets[dialogValue] || dialogValue;
        }

        // Get other values
        const videoTitle = videoTitleInput ? videoTitleInput.value.trim() : '';
        const secondary = secondaryInput ? secondaryInput.value.trim() : '';
        const speechText = speechTextInput ? speechTextInput.value.trim() : '';
        const timeOfDay = timeSelect ? timeSelect.value : 'day';
        const sceneCount = sceneCountSelect ? parseInt(sceneCountSelect.value) || 5 : 5;

        // Generate prompts
        const prompts = [];
        for (let i = 0; i < sceneCount; i++) {
            const prompt = generateScenePrompt(i, sceneCount, {
                character, costume, location, dialogue,
                videoTitle, secondary, speechText, timeOfDay
            });
            prompts.push(prompt);
        }

        // Display prompts
        displayPrompts(prompts);
    }

    // ===== Generate Single Scene Prompt =====
    function generateScenePrompt(index, total, data) {
        const { character, costume, location, dialogue, videoTitle, secondary, speechText, timeOfDay } = data;

        // Determine scene type
        let sceneType;
        if (index === 0) sceneType = 'Opening Shot';
        else if (index === total - 1) sceneType = 'Closing Shot';
        else if (index < total * 0.3) sceneType = 'Build-up';
        else if (index < total * 0.7) sceneType = 'Development';
        else sceneType = 'Climax';

        // Build prompt
        let prompt = character;

        if (costume) {
            prompt += `, wearing ${costume}, the character MUST wear ${costume} in every single frame`;
        }

        if (videoTitle) {
            prompt += `. ${videoTitle}`;
        }

        if (secondary) {
            prompt += ` ${secondary}`;
        }

        if (dialogue) {
            prompt += `, ${dialogue}`;
        }

        if (location) {
            prompt += `. Scene is set ${location}`;
        }

        // Add camera and lighting
        const camera = cameras[index % cameras.length];
        const lighting = timeLighting[timeOfDay] || 'natural lighting';
        prompt += `. ${camera}, ${lighting}`;

        // Add speech if provided
        let speech = '';
        if (speechText) {
            speech = ` Character says: '${speechText}'.`;
            prompt += speech;
        }

        // Add movement instruction
        prompt += '. Character is ACTIVELY MOVING with natural body motion, walking, gesturing, and expressing emotions dynamically. NO STATIC POSES.';

        // Consistency note - include specific costume if provided
        let consistency = 'IMPORTANT: Maintain EXACT same character appearance, same face, same clothing, same hairstyle throughout all scenes.';
        if (costume) {
            consistency += ` Character MUST always wear ${costume} - do NOT change the outfit.`;
        }

        // Negative prompt
        const negativePrompt = 'Negative prompt: no captions, no subtitles, no text overlay, no watermark';

        return {
            sceneNumber: index + 1,
            sceneType: sceneType,
            prompt: prompt,
            consistency: consistency,
            negativePrompt: negativePrompt,
            fullPrompt: `${prompt} ${consistency} ${negativePrompt}`
        };
    }

    // ===== Display Prompts =====
    function displayPrompts(prompts) {
        if (!promptsContainer || !outputSection) {
            console.error('Output elements not found');
            return;
        }

        promptsContainer.innerHTML = '';

        // Display individual JSON cards per scene
        prompts.forEach((p) => {
            // Create JSON for this scene only
            const sceneJson = {
                scene: p.sceneNumber,
                type: p.sceneType,
                prompt: p.prompt,
                consistency: p.consistency,
                negative: p.negativePrompt
            };

            const card = document.createElement('div');
            card.className = 'prompt-card';
            card.innerHTML = `
                <div class="prompt-header">
                    <span class="scene-badge">🎬 Scene ${p.sceneNumber}</span>
                    <span class="scene-type">${p.sceneType}</span>
                </div>
                <div class="prompt-content">
                    <pre class="prompt-text json-output" style="white-space: pre-wrap; word-wrap: break-word; font-family: 'Courier New', monospace; font-size: 13px; background: rgba(0,0,0,0.3); padding: 15px; border-radius: 8px;">${JSON.stringify(sceneJson, null, 2)}</pre>
                </div>
                <button class="copy-btn" onclick="copyPrompt(this, '${encodeURIComponent(JSON.stringify(sceneJson, null, 2))}')">
                    📋 Copy JSON
                </button>
            `;
            promptsContainer.appendChild(card);
        });

        outputSection.style.display = 'block';
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        console.log('Prompts displayed:', prompts.length);
    }

    // ===== Copy Functions =====
    function copyToClipboard(text) {
        navigator.clipboard.writeText(text).then(() => {
            console.log('Copied to clipboard');
        }).catch(err => {
            console.error('Copy failed:', err);
            // Fallback
            const textarea = document.createElement('textarea');
            textarea.value = text;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        });
    }

    function showToast(message) {
        if (!toast) return;
        const msgEl = document.getElementById('toastMessage');
        if (msgEl) msgEl.textContent = message;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
    }

    // Make copyPrompt global for inline onclick
    window.copyPrompt = function (btn, encodedPrompt) {
        const text = decodeURIComponent(encodedPrompt);
        copyToClipboard(text);
        btn.textContent = '✓ Copied!';
        btn.classList.add('copied');
        setTimeout(() => {
            btn.textContent = '📋 Copy';
            btn.classList.remove('copied');
        }, 2000);
        showToast('Prompt copied!');
    };

    console.log('FlowPrompt ready!');
});
