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
    let currentTab = 'video'; // 'video' or 'image'

    // Checkbox for no dialog text
    const noDialogTextCheckbox = document.getElementById('noDialogText');

    // Tab buttons
    const tabBtns = document.querySelectorAll('.tab-btn');

    // ===== Tab Switcher =====
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentTab = btn.dataset.tab;
            console.log('Tab switched to:', currentTab);

            // Update UI labels based on tab
            updateUIForTab(currentTab);
        });
    });

    // ===== Update UI for Tab =====
    function updateUIForTab(tab) {
        const titleLabel = document.querySelector('label[for="videoTitleInput"]');
        const titleInput = document.getElementById('videoTitleInput');
        const sceneLabel = document.querySelector('label[for="sceneCountSelect"]');
        const durationGroup = document.getElementById('durationSelect')?.closest('.input-group');

        if (tab === 'image') {
            if (titleLabel) titleLabel.innerHTML = '<span class="icon">🖼️</span> Image Title / Description';
            if (titleInput) titleInput.placeholder = 'e.g., Portrait of a woman in a garden, Landscape at sunset';
            if (sceneLabel) sceneLabel.innerHTML = '<span class="icon">🎞️</span> Number of Images';
            if (durationGroup) durationGroup.style.display = 'none';
        } else {
            if (titleLabel) titleLabel.innerHTML = '<span class="icon">🎬</span> Video Title / Story Context';
            if (titleInput) titleInput.placeholder = 'e.g., A romantic date at the beach, Adventure in the mountains';
            if (sceneLabel) sceneLabel.innerHTML = '<span class="icon">🎞️</span> Number of Scenes';
            if (durationGroup) durationGroup.style.display = 'block';
        }
    }

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

        // Get image style (Banana or GPT)
        const imageStyleInput = document.querySelector('input[name="imageStyle"]:checked');
        const imageStyle = imageStyleInput ? imageStyleInput.value : 'banana';

        // Get no dialog text option
        const noDialogText = noDialogTextCheckbox ? noDialogTextCheckbox.checked : true;

        // Generate prompts based on current tab (video or image)
        const prompts = [];
        for (let i = 0; i < sceneCount; i++) {
            let prompt;
            if (currentTab === 'image') {
                prompt = generateImagePrompt(i, sceneCount, {
                    character, costume, location, dialogue,
                    videoTitle, secondary, speechText, timeOfDay,
                    imageStyle, noDialogText
                });
            } else {
                prompt = generateVideoPrompt(i, sceneCount, {
                    character, costume, location, dialogue,
                    videoTitle, secondary, speechText, timeOfDay,
                    imageStyle, noDialogText
                });
            }
            prompts.push(prompt);
        }

        // Display prompts
        displayPrompts(prompts, currentTab);
    }

    // ===== Scene Emotions & Actions by Type =====
    const sceneEmotions = {
        'Opening Shot': {
            emotions: ['calm and serene', 'curious and intrigued', 'peaceful and content', 'hopeful and excited'],
            actions: ['standing gracefully', 'looking around with wonder', 'taking a deep breath', 'walking slowly into frame'],
            cameraAngles: ['wide establishing shot', 'slow push-in from medium distance', 'cinematic reveal shot', 'dolly in with slight crane up']
        },
        'Build-up': {
            emotions: ['growing excitement', 'gentle anticipation', 'warm and friendly', 'playful and lighthearted'],
            actions: ['walking with purpose', 'gesturing expressively', 'interacting with environment', 'showing genuine interest'],
            cameraAngles: ['medium shot following movement', 'tracking shot from the side', 'smooth dolly alongside subject', 'handheld with subtle movement']
        },
        'Development': {
            emotions: ['deep engagement', 'genuine happiness', 'thoughtful reflection', 'warm connection'],
            actions: ['expressing emotions through gestures', 'moving naturally and fluidly', 'reacting to surroundings', 'showing authentic body language'],
            cameraAngles: ['close-up capturing emotion', 'over-the-shoulder shot', 'orbital shot around subject', 'push-in to emphasize moment']
        },
        'Climax': {
            emotions: ['peak emotion', 'overwhelming joy', 'profound realization', 'intense connection'],
            actions: ['powerful emotional expression', 'meaningful gesture or movement', 'climactic action', 'turning point moment'],
            cameraAngles: ['dramatic close-up', 'slow motion capture', 'dynamic crane shot', 'impactful dolly zoom']
        },
        'Closing Shot': {
            emotions: ['satisfied and peaceful', 'nostalgic warmth', 'hopeful for future', 'content and fulfilled'],
            actions: ['walking away gracefully', 'looking back with smile', 'embracing the moment', 'fading into the scene'],
            cameraAngles: ['wide pull-back shot', 'slow crane up and away', 'fade with soft focus', 'cinematic ending pullout']
        }
    };

    // ===== Visual Styles =====
    const visualStyles = [
        'Cinematic 4K quality, photorealistic rendering, film grain texture, anamorphic lens distortion',
        'Ultra HD cinematic look, shallow depth of field, professional color grading, filmic texture',
        'Hollywood-style cinematography, rich contrast, detailed textures, premium production value',
        'High-end commercial quality, crisp details, balanced exposure, cinematic color palette',
        'Professional film production, natural skin tones, atmospheric depth, refined aesthetics'
    ];

    // ===== Image Style Presets =====
    const imageStylePresets = {
        'banana': {
            quality: "4K ultra-realistic cinematic",
            colorGrading: "Hollywood film color science with rich contrast",
            rendering: "photorealistic rendering, film grain texture, anamorphic lens",
            skin: "natural skin texture with subsurface scattering, realistic pores",
            lighting: "volumetric lighting with natural shadows",
            details: "hyper-detailed textures, sharp focus, realistic materials"
        },
        'gpt': {
            quality: "4K artistic stylized",
            colorGrading: "vibrant artistic color palette with creative tones",
            rendering: "digital art style, clean lines, stylized aesthetics",
            skin: "smooth artistic skin rendering, stylized features",
            lighting: "dramatic artistic lighting with creative shadows",
            details: "stylized details, artistic interpretation, clean composition"
        }
    };

    // ===== Image Composition Types =====
    const imageCompositions = [
        'rule of thirds with subject on left intersection',
        'centered composition with symmetrical balance',
        'golden ratio spiral leading to subject',
        'diagonal composition creating dynamic tension',
        'framing composition using environmental elements'
    ];

    // ===== Generate Image Prompt (for static images) =====
    function generateImagePrompt(index, total, data) {
        const { character, costume, location, dialogue, videoTitle, secondary, speechText, timeOfDay, imageStyle, noDialogText } = data;

        const lighting = timeLighting[timeOfDay] || 'natural lighting';
        const stylePreset = imageStylePresets[imageStyle] || imageStylePresets['banana'];
        const composition = imageCompositions[index % imageCompositions.length];

        // Build avoid list for images
        const avoidList = [
            "distorted features",
            "extra limbs",
            "blurry details",
            "duplicate faces",
            "floating hands",
            "watermarks",
            "low resolution",
            "pixelation"
        ];

        if (noDialogText) {
            avoidList.unshift(
                "text overlays",
                "dialog boxes",
                "speech bubbles",
                "subtitles",
                "captions",
                "written text",
                "floating text",
                "any text in image"
            );
        }

        // Build JSON structure for IMAGE generation
        const jsonPrompt = {
            image: {
                number: index + 1,
                total: total,
                type: "static image"
            },
            renderStyle: {
                type: imageStyle === 'gpt' ? 'GPT Artistic' : 'Banana Cinematic',
                rendering: stylePreset.rendering,
                quality: stylePreset.quality
            },
            subject: {
                description: character,
                appearance: costume ? `wearing ${costume}` : null,
                physicalDetails: stylePreset.skin,
                pose: "natural and expressive pose",
                expression: "genuine emotional expression"
            },
            visualStyle: {
                quality: stylePreset.quality,
                colorGrading: stylePreset.colorGrading,
                depthOfField: "professional bokeh with sharp subject focus",
                resolution: "4K ultra high definition",
                details: stylePreset.details
            },
            composition: {
                type: composition,
                framing: "professional portrait framing",
                perspective: "eye-level natural perspective",
                aspectRatio: "16:9 or 4:3"
            },
            environment: {
                setting: location || "contextual background",
                timeOfDay: timeOfDay,
                lighting: `${lighting}, ${stylePreset.lighting}`,
                atmosphere: "natural ambient with environmental depth"
            },
            context: videoTitle ? {
                narrative: videoTitle,
                mood: "matching visual mood"
            } : null,
            additionalSubjects: secondary ? {
                description: secondary,
                uniqueAppearance: true,
                positioning: "natural placement in scene"
            } : null,
            interaction: dialogue ? {
                type: dialogue,
                connectionStyle: "genuine and natural"
            } : null,
            noTextInImage: noDialogText,
            consistency: {
                maintainIdentity: true,
                preserveAppearance: true,
                singleCharacterReference: true,
                uniqueFeatures: true
            },
            avoid: avoidList
        };

        // Clean JSON
        const cleanJSON = JSON.parse(JSON.stringify(jsonPrompt, (key, value) => {
            if (value === null || value === undefined) return undefined;
            return value;
        }));

        const jsonString = JSON.stringify(cleanJSON, null, 2);

        // Simple prompt for images
        const styleLabel = imageStyle === 'gpt' ? 'GPT artistic style' : 'Banana cinematic style';
        let simplePrompt = `[IMAGE - ${styleLabel}] ${character}`;
        if (costume) simplePrompt += `, wearing ${costume}`;
        if (location) simplePrompt += `, ${location}`;
        simplePrompt += `. ${composition}, ${lighting}`;
        if (dialogue) simplePrompt += `, ${dialogue}`;
        if (videoTitle) simplePrompt += `. Theme: ${videoTitle}`;
        if (noDialogText) simplePrompt += '. NO TEXT IN IMAGE.';
        simplePrompt += ' High resolution, professional quality.';

        return {
            sceneNumber: index + 1,
            sceneType: 'Image ' + (index + 1),
            promptType: 'image',
            imageStyle: imageStyle,
            jsonPrompt: cleanJSON,
            jsonString: jsonString,
            simplePrompt: simplePrompt,
            fullPrompt: jsonString
        };
    }

    // ===== Generate Video Prompt (for video scenes) =====
    function generateVideoPrompt(index, total, data) {
        const { character, costume, location, dialogue, videoTitle, secondary, speechText, timeOfDay, imageStyle, noDialogText } = data;

        // Determine scene type
        let sceneType;
        if (index === 0) sceneType = 'opening';
        else if (index === total - 1) sceneType = 'closing';
        else if (index < total * 0.3) sceneType = 'buildup';
        else if (index < total * 0.7) sceneType = 'development';
        else sceneType = 'climax';

        // Get scene-specific elements
        const sceneTypeKey = index === 0 ? 'Opening Shot' :
            index === total - 1 ? 'Closing Shot' :
                index < total * 0.3 ? 'Build-up' :
                    index < total * 0.7 ? 'Development' : 'Climax';

        const sceneData = sceneEmotions[sceneTypeKey];
        const emotion = sceneData.emotions[index % sceneData.emotions.length];
        const action = sceneData.actions[index % sceneData.actions.length];
        const cameraAngle = sceneData.cameraAngles[index % sceneData.cameraAngles.length];
        const lighting = timeLighting[timeOfDay] || 'natural lighting';

        // Get style preset based on selection
        const stylePreset = imageStylePresets[imageStyle] || imageStylePresets['banana'];

        // Build avoid list - always include text/dialog related items when noDialogText is true
        const avoidList = [
            "distorted features",
            "extra limbs",
            "blurry details",
            "static poses",
            "duplicate faces",
            "floating hands",
            "watermarks"
        ];

        // Add text-related items to avoid if noDialogText is enabled
        if (noDialogText) {
            avoidList.unshift(
                "text overlays",
                "dialog boxes",
                "speech bubbles",
                "subtitles",
                "captions",
                "written text",
                "floating text",
                "any text in image"
            );
        }

        // Build JSON structure safe for Google Flow Veo 3 VIDEO
        const jsonPrompt = {
            video: {
                number: index + 1,
                total: total,
                type: sceneType,
                sceneType: sceneTypeKey
            },
            renderStyle: {
                type: imageStyle === 'gpt' ? 'GPT Artistic' : 'Banana Cinematic',
                rendering: stylePreset.rendering,
                quality: stylePreset.quality
            },
            subject: {
                description: character,
                appearance: costume ? `wearing ${costume}` : null,
                physicalDetails: stylePreset.skin,
                emotionalState: emotion,
                action: action
            },
            visualStyle: {
                quality: stylePreset.quality,
                colorGrading: stylePreset.colorGrading,
                depthOfField: "natural bokeh with sharp subject focus",
                aspectRatio: "16:9",
                frameRate: "24fps smooth motion",
                details: stylePreset.details
            },
            environment: {
                setting: location || "contextual background",
                timeOfDay: timeOfDay,
                lighting: `${lighting}, ${stylePreset.lighting}`,
                atmosphere: "natural ambient lighting with environmental depth"
            },
            camera: {
                shotType: cameraAngle,
                movement: cameras[index % cameras.length],
                focus: "sharp focus on subject",
                framing: "rule of thirds composition"
            },
            audio: speechText ? {
                dialogue: speechText,
                lipSync: true,
                voiceTone: "natural and clear",
                timing: "natural speech rhythm"
            } : {
                type: "ambient",
                breathing: "visible natural breathing",
                environment: "scene-appropriate sounds"
            },
            context: videoTitle ? {
                narrative: videoTitle,
                storyRole: sceneType
            } : null,
            additionalSubjects: secondary ? {
                description: secondary,
                uniqueAppearance: true
            } : null,
            interaction: dialogue ? {
                type: dialogue,
                connectionStyle: "genuine and natural"
            } : null,
            noTextInImage: noDialogText,
            consistency: {
                maintainIdentity: true,
                preserveAppearance: true,
                singleCharacterReference: true,
                noCloning: true,
                uniqueFeatures: true
            },
            avoid: avoidList
        };

        // Clean JSON - remove null values
        const cleanJSON = JSON.parse(JSON.stringify(jsonPrompt, (key, value) => {
            if (value === null || value === undefined) return undefined;
            return value;
        }));

        // Create formatted JSON string
        const jsonString = JSON.stringify(cleanJSON, null, 2);

        // Create a simple text version for quick copy
        const styleLabel = imageStyle === 'gpt' ? 'GPT artistic style' : 'Banana cinematic style';
        let simplePrompt = `[VIDEO - ${styleLabel}] ${character}`;
        if (costume) simplePrompt += `, wearing ${costume}`;
        if (location) simplePrompt += `, ${location}`;
        simplePrompt += `. ${cameraAngle}, ${lighting}, ${emotion}, ${action}`;
        if (dialogue) simplePrompt += `, ${dialogue}`;
        if (speechText) simplePrompt += `. Speaking: "${speechText}"`;
        if (videoTitle) simplePrompt += `. Context: ${videoTitle}`;
        if (noDialogText) simplePrompt += '. NO TEXT OR DIALOG IN VIDEO.';
        simplePrompt += ' Maintain character consistency throughout.';

        return {
            sceneNumber: index + 1,
            sceneType: sceneTypeKey,
            promptType: 'video',
            imageStyle: imageStyle,
            jsonPrompt: cleanJSON,
            jsonString: jsonString,
            simplePrompt: simplePrompt,
            fullPrompt: jsonString
        };
    }

    // ===== Display Prompts (JSON Format) =====
    function displayPrompts(prompts, tabType) {
        if (!promptsContainer || !outputSection) {
            console.error('Output elements not found');
            return;
        }

        promptsContainer.innerHTML = '';

        // Display JSON prompt cards per scene
        prompts.forEach((p) => {
            const card = document.createElement('div');
            card.className = 'prompt-card';

            // Format JSON with syntax highlighting
            const jsonFormatted = p.jsonString
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')
                .replace(/"([^"]+)":/g, '<span class="json-key">"$1"</span>:')
                .replace(/: "([^"]+)"/g, ': <span class="json-string">"$1"</span>')
                .replace(/: (\d+)/g, ': <span class="json-number">$1</span>')
                .replace(/: (true|false)/g, ': <span class="json-boolean">$1</span>')
                .replace(/\n/g, '<br>')
                .replace(/  /g, '&nbsp;&nbsp;');

            // Get style badge
            const styleBadge = p.imageStyle === 'gpt' ? '🤖 GPT' : '🍌 Banana';

            // Get type badge based on promptType
            const typeBadge = p.promptType === 'image' ? '🖼️ Image' : '🎬 Video';
            const typeLabel = p.promptType === 'image' ? 'Image' : 'Scene';

            card.innerHTML = `
                <div class="prompt-header">
                    <span class="scene-badge">${typeBadge} ${p.sceneNumber}</span>
                    <span class="scene-type">${p.sceneType}</span>
                    <span class="style-badge">${styleBadge}</span>
                    <span class="format-badge">JSON</span>
                </div>
                <div class="prompt-content">
                    <pre class="json-display"><code>${jsonFormatted}</code></pre>
                </div>
                <div class="prompt-actions">
                    <button class="copy-btn copy-json" onclick="copyPrompt(this, '${encodeURIComponent(p.jsonString)}')">
                        📋 Copy JSON Prompt
                    </button>
                    <button class="copy-btn copy-simple" onclick="copyPrompt(this, '${encodeURIComponent(p.simplePrompt)}')">
                        ⚡ Copy Simple Version
                    </button>
                </div>
            `;
            promptsContainer.appendChild(card);
        });

        outputSection.style.display = 'block';
        outputSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        console.log('JSON Prompts displayed:', prompts.length);
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
