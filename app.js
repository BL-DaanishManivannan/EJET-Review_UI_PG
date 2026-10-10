// Default Prompts (Production-grade detailed system prompts mirrored from backend)
const DEFAULT_PROMPTS = {
    Coding: `You are an expert programming evaluator.

Your responsibilities:

1. Review code quality.
2. Analyze correctness.
3. Evaluate efficiency.
4. Suggest improvements.
5. Detect the programming language for each submission when it is not explicitly provided.

Supported language classifications:

- Python
- Java
- C#
- JavaScript
- TypeScript
- C++
- C
- Pseudo-code

Use \`Pseudo-code\` for:

- pseudo-code
- non-coding input
- irrelevant input
- plain text that does not constitute a programming solution
- natural-language-only responses
- gibberish or off-topic responses

EVALUATION RULES
----------------

Evaluate ONLY the provided question-answer submission.

Consider:

- Correctness of the solution
- Logical bugs
- Missing edge cases
- Code readability
- Code maintainability
- Algorithm efficiency
- Algorithm complexity
- Adherence to specific instructions
- Opportunities for improvement

If specific instructions are provided with the submission:

- Treat them as additional requirements for the question.
- Evaluate whether the submitted answer satisfies them.
- Include violations or missed requirements in \`correctness_feedback\`.
- Do not ignore explicit requirements from the specific instructions.

CORRECTNESS FEEDBACK
--------------------

\`correctness_feedback\` must contain exactly 2 sentences.

Sentence 1:
- Assess whether the solution is correct.
- Explain why.

Sentence 2:
- Provide a genuine improvement suggestion if one exists.
- The improvement may relate to readability, edge cases, alternative approaches, code style, efficiency, or another meaningful technical concern.
- If the code is already optimal and no meaningful improvement exists, use Sentence 2 to clearly confirm that the solution is strong.
- Do not invent suggestions.

Do NOT include a separate improvement-suggestions field.

SCORING
-------

All scores must be between 0.0 and 10.0.

The following scores are required:

- completeness_score
- code_quality_score
- approach_taken_score
- overall_score

Calculate \`overall_score\` using exactly this formula:

(0.5 * completeness_score)
+ (0.3 * code_quality_score)
+ (0.2 * approach_taken_score)

SCENARIO EVALUATION
-------------------

First determine which scenario the submission belongs to.

SCENARIO A: EXECUTABLE CODE

The submission contains valid, compilable syntax in one of the supported programming languages.

For executable code:

- Evaluate completeness normally.
- Evaluate code quality normally.
- Evaluate the approach normally.
- A fully correct and optimal solution may receive up to 10.0 for completeness_score.
- A fully correct and optimal solution may receive up to 10.0 for code_quality_score.
- A fully correct and optimal solution may receive up to 10.0 for approach_taken_score.

SCENARIO B: RELEVANT PSEUDO-CODE OR ALGORITHMIC LOGIC

The submission describes valid logic or steps to solve the problem but does not use strict programming-language syntax.

For this scenario:

- The language MUST be \`Pseudo-code\`.
- completeness_score must be capped at 5.0.
- approach_taken_score must be capped at 8.5.
- code_quality_score must be capped at 2.0 because there is no executable programming-language syntax to evaluate.
- Evaluate completeness based on whether the logic covers the requirements and relevant edge cases.
- Evaluate approach_taken_score based on algorithm correctness and efficiency.
- Evaluate code_quality_score based on readability, structure, and clarity of the pseudo-code.
- \`correctness_feedback\` must contain exactly 2 sentences.
- The feedback must acknowledge that the submission is pseudo-code, evaluate the logic, and note that the applicable scores are capped because the submission is not executable programming-language code.

SCENARIO C: IRRELEVANT, OFF-TOPIC, NON-CODING, OR GIBBERISH

The submission is:

- off-topic
- random text
- conversational remarks such as "I don't know" or "Help me"
- a non-programming description
- a question restatement without a solution
- completely irrelevant to solving the question
- otherwise not a valid programming or algorithmic solution

For this scenario:

- The language MUST be \`Pseudo-code\`.
- completeness_score MUST be 0.0.
- code_quality_score MUST be 0.0.
- approach_taken_score MUST be 0.0.
- overall_score MUST be 0.0.
- \`correctness_feedback\` must contain exactly 2 sentences.

Sentence 1:
- Explicitly state that the submission is irrelevant or does not provide a valid programming or algorithmic solution for the question.

Sentence 2:
- Provide a concise description of the expected algorithmic or coding approach required to solve the question.

LANGUAGE DETECTION
------------------

When a programming language is explicitly provided, use that provided language as the language classification.

When the programming language is NOT provided:

- Detect the language from the submitted code, context, and question-specific instructions.
- If the submission is Python, classify it as \`Python\`.
- If the submission is Java, classify it as \`Java\`.
- If the submission is C#, classify it as \`C#\`.
- If the submission is JavaScript, classify it as \`JavaScript\`.
- If the submission is TypeScript, classify it as \`TypeScript\`.
- If the submission is C++, classify it as \`C++\`.
- If the submission is C, classify it as \`C\`.
- For pseudo-code, non-coding, irrelevant, or gibberish input, classify it as \`Pseudo-code\`.

IMPORTANT
---------

Base the evaluation strictly on the submitted question-answer content and its specific instructions.
Do not assume requirements that were not provided.
Return the response using the structured output schema.`,
    Concept: `You are an expert technical evaluator evaluating conceptual, architectural, and theoretical computer science answers.

Your responsibilities:

1. Review conceptual accuracy.
2. Analyze technical correctness and depth.
3. Evaluate clarity, structure, and communication.
4. Suggest genuine improvements and point out misconceptions.
5. Validate adherence to any specific question instructions.

EVALUATION RULES
----------------

Evaluate ONLY the provided question-answer submission.

Consider:

- Technical accuracy of definitions, mechanisms, and principles
- Completeness of the explanation (covering core aspects and trade-offs)
- Clarity, structure, and precision of technical terminology
- Quality and relevance of examples or use cases provided
- Identification of any technical misconceptions or errors
- Adherence to specific instructions if provided

If specific instructions are provided with the submission:

- Treat them as additional requirements or rubrics for the question.
- Evaluate whether the submitted answer satisfies them.
- Include violations or missed requirements in \`correctness_feedback\`.
- Do not ignore explicit requirements from the specific instructions.

CORRECTNESS FEEDBACK
--------------------

\`correctness_feedback\` must contain exactly 2 sentences.

Sentence 1:
- Assess whether the conceptual explanation is accurate and technically sound.
- Explain why.

Sentence 2:
- Provide a genuine improvement suggestion if one exists.
- The improvement may relate to depth of mechanism, missing trade-offs, edge cases, clearer terminology, or relevant practical examples.
- If the explanation is already comprehensive and optimal, use Sentence 2 to clearly confirm that the answer is strong.
- Do not invent suggestions.

Do NOT include a separate improvement-suggestions field.

SCORING
-------

All scores must be between 0.0 and 10.0.

The following scores are required:

- completeness_score
- code_quality_score
- approach_taken_score
- overall_score

In conceptual evaluation:
- \`completeness_score\`: Evaluates how thoroughly the answer covers the core definition, key mechanisms, and required nuances.
- \`code_quality_score\`: Evaluates the clarity, organization, structure, and precision of technical terminology used in the explanation.
- \`approach_taken_score\`: Evaluates the soundness of reasoning, depth of conceptual understanding, and relevance of examples, analogies, or trade-offs.

Calculate \`overall_score\` using exactly this formula:

(0.5 * completeness_score)
+ (0.3 * code_quality_score)
+ (0.2 * approach_taken_score)

SCENARIO EVALUATION
-------------------

First determine which scenario the submission belongs to.

SCENARIO A: ACCURATE & COMPREHENSIVE CONCEPTUAL ANSWER

The submission provides an accurate, well-reasoned explanation addressing the question.

For this scenario:

- Evaluate completeness based on thoroughness and coverage.
- Evaluate code_quality_score based on clarity, structure, and terminology.
- Evaluate approach_taken_score based on reasoning depth and trade-offs.
- A fully accurate and comprehensive answer may receive up to 10.0 across all scores.

SCENARIO B: PARTIALLY ACCURATE, VAGUE, OR INCOMPLETE CONCEPTUAL ANSWER

The submission demonstrates basic understanding but contains inaccuracies, omissions of key mechanisms, surface-level definitions without depth, or minor misconceptions.

For this scenario:

- completeness_score must be capped at 6.5.
- approach_taken_score must be capped at 7.0.
- Deduct points for missing mechanisms, vague assertions, or factual errors.
- \`correctness_feedback\` must highlight what was partially correct in Sentence 1 and identify the critical gap or misconception in Sentence 2.

SCENARIO C: IRRELEVANT, OFF-TOPIC, NON-TECHNICAL, OR GIBBERISH

The submission is:

- off-topic
- random text or gibberish
- conversational remarks such as "I don't know" or "No idea"
- a restatement of the question without an explanation
- completely irrelevant to the technical concept asked

For this scenario:

- completeness_score MUST be 0.0.
- code_quality_score MUST be 0.0.
- approach_taken_score MUST be 0.0.
- overall_score MUST be 0.0.
- \`correctness_feedback\` must contain exactly 2 sentences:
  Sentence 1: Explicitly state that the submission is irrelevant, off-topic, or does not provide a valid explanation of the requested concept.
  Sentence 2: Provide a concise, accurate technical summary of the core concept required to answer the question.

IMPORTANT
---------

Base the evaluation strictly on the submitted question-answer content and its specific instructions.
Do not assume requirements that were not provided.
Return the response using the structured output schema.`
};

// Ready-to-use realistic sample data
const SAMPLES = {
    Coding: {
        questionId: 'two-sum',
        language: 'Java',
        model: 'gemini-2.5-flash',
        questionText: 'Write a function twoSum(int[] nums, int target) in Java that returns indices of the two numbers such that they add up to target. What is the time complexity?',
        instructions: 'Check for optimal O(n) time complexity. Ensure edge cases like negative numbers and duplicates are accounted for.',
        answerText: `class Solution {
    public int[] twoSum(int[] nums, int target) {
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            int complement = target - nums[i];
            if (map.containsKey(complement)) {
                return new int[] { map.get(complement), i };
            }
            map.put(nums[i], i);
        }
        throw new IllegalArgumentException("No two sum solution");
    }
}
// Time Complexity: O(n), Space Complexity: O(n)`
    },
    Concept: {
        questionId: 'db-locking-concept',
        language: 'Auto Detect',
        model: 'gemini-2.5-flash',
        questionText: 'Explain the difference between optimistic and pessimistic locking in databases. Provide an ideal use case for each.',
        instructions: 'Evaluate conceptual clarity and whether appropriate real-world scenarios are provided for each locking strategy.',
        answerText: `1. Optimistic Locking:
- Assumes conflict is rare. Transactions proceed without locks and verify that no other transaction modified the data before committing (e.g., using a version or timestamp column).
- Ideal Use Case: High-read, low-write systems such as e-commerce product catalogs or blog CMS where concurrent edits to the exact same record are infrequent.

2. Pessimistic Locking:
- Assumes conflicts are likely. The database places exclusive row or table locks at read time (e.g., SELECT ... FOR UPDATE), blocking others until completion.
- Ideal Use Case: High-contention, strictly consistent transactional systems like banking fund transfers, seat bookings, or inventory deductions.`
    }
};

// State Management (Default Model: gemini-2.5-flash)
const state = {
    globalSettings: {
        prompt: 'code-eval',
        model: 'gemini-2.5-flash',
        language: 'Auto Detect',
        llm_token_compute_flag: false,
        questionType: 'Coding'
    },
    testCases: [
        { id: 'tab-1', questionId: 'question-1', questionText: '', answerText: '', instructions: '', systemPrompt: DEFAULT_PROMPTS.Coding, promptSource: 'system' }
    ],
    activeTabId: 'tab-1',
    evaluationId: 'evalidtest',
    consoleLogCount: 0
};

// DOM Elements
const els = {
    promptSelect: document.getElementById('prompt-select'),
    modelSelect: document.getElementById('model-select'),
    customModelInput: document.getElementById('custom-model-input'),
    languageSelect: document.getElementById('language-select'),
    tokenFlag: document.getElementById('token-flag'),
    qTypeRadios: document.getElementsByName('q-type'),
    
    tabsList: document.getElementById('tabs-list'),
    addTabBtn: document.getElementById('add-tab-btn'),
    tabMetaTag: document.getElementById('tab-meta-tag'),
    
    qIdInput: document.getElementById('question-id'),
    qTextInput: document.getElementById('question-text'),
    questionInstructionsBtn: document.getElementById('question-instructions-btn'),
    instructionBtnLabel: document.getElementById('instruction-btn-label'),
    instructionModalOverlay: document.getElementById('instruction-modal-overlay'),
    questionInstructionsTextarea: document.getElementById('question-instructions-textarea'),
    closeInstructionBtn: document.getElementById('close-instruction-btn'),
    saveInstructionBtn: document.getElementById('save-instruction-btn'),
    aTextInput: document.getElementById('answer-text'),
    systemPromptInput: document.getElementById('system-prompt-text'),
    promptSourceBadge: document.getElementById('prompt-source-badge'),
    promptLinesBadge: document.getElementById('prompt-lines-badge'),
    resetPromptBtn: document.getElementById('reset-prompt-btn'),
    autoFitPromptBtn: document.getElementById('auto-fit-prompt-btn'),
    
    clearAllBtn: document.getElementById('clear-all-btn'),
    loadSampleBtn: document.getElementById('load-sample-btn'),
    genJsonBtn: document.getElementById('generate-json-btn'),
    runEvalBtn: document.getElementById('run-eval-btn'),
    
    resultsPanel: document.getElementById('results-panel'),
    toggleResultsPanelBtn: document.getElementById('toggle-results-panel-btn'),
    resultsContent: document.getElementById('results-content'),
    resultsTemplate: document.getElementById('results-template'),
    jsonDisplay: document.getElementById('json-display'),
    jsonModalOverlay: document.getElementById('json-modal-overlay'),
    closeJsonModalBtn: document.getElementById('close-json-modal-btn'),
    
    consoleDrawer: document.getElementById('console-drawer'),
    consoleHeaderToggle: document.getElementById('console-header-toggle'),
    consoleCount: document.getElementById('console-count'),
    clearConsoleBtn: document.getElementById('clear-console-btn'),
    consoleOutput: document.getElementById('console-output'),
    
    resultsTabs: document.querySelectorAll('.results-tab'),
    resultsTabContents: document.querySelectorAll('.results-tab-content'),
    curlDisplay: document.getElementById('curl-display'),
    requestDisplay: document.getElementById('request-display'),
    responseDisplay: document.getElementById('response-display'),
    
    importJsonBtn: document.getElementById('import-json-btn'),
    importModalOverlay: document.getElementById('import-modal-overlay'),
    closeImportBtn: document.getElementById('close-import-btn'),
    applyImportBtn: document.getElementById('apply-import-btn'),
    importJsonTextarea: document.getElementById('import-json-textarea'),
    toastContainer: document.getElementById('toast-container')
};

// Initialization
function init() {
    bindGlobalSettings();
    bindFormInputs();
    bindCopyButtons();
    bindClearButtons();
    bindTabIndentation();
    bindConsoleDrawer();
    bindPromptAutoFit();
    bindResultsPanelToggle();
    renderTabs();
    updateFormFromState();
    updateCurlDisplay();
    
    els.addTabBtn.addEventListener('click', addNewTab);
    els.genJsonBtn.addEventListener('click', showPayload);
    els.runEvalBtn.addEventListener('click', runEvaluation);
    
    if (els.clearAllBtn) {
        els.clearAllBtn.addEventListener('click', resetAllToDefault);
    }
    
    if (els.loadSampleBtn) {
        els.loadSampleBtn.addEventListener('click', loadSampleCase);
    }
    
    // Question Instructions Modal Bindings
    if (els.questionInstructionsBtn) {
        els.questionInstructionsBtn.addEventListener('click', () => {
            const activeTab = state.testCases.find(t => t.id === state.activeTabId);
            if (activeTab && els.questionInstructionsTextarea) {
                els.questionInstructionsTextarea.value = activeTab.instructions || '';
            }
            if (els.instructionModalOverlay) {
                els.instructionModalOverlay.classList.remove('hidden');
                if (els.questionInstructionsTextarea) els.questionInstructionsTextarea.focus();
            }
        });
    }

    if (els.closeInstructionBtn) {
        els.closeInstructionBtn.addEventListener('click', () => {
            if (els.instructionModalOverlay) els.instructionModalOverlay.classList.add('hidden');
        });
    }

    if (els.saveInstructionBtn) {
        els.saveInstructionBtn.addEventListener('click', () => {
            const activeTab = state.testCases.find(t => t.id === state.activeTabId);
            if (activeTab && els.questionInstructionsTextarea) {
                activeTab.instructions = els.questionInstructionsTextarea.value.trim();
                updateInstructionBtnState(activeTab.instructions);
                updateCurlDisplay();
                showToast(activeTab.instructions ? 'Instructions saved' : 'Instructions cleared', 'info');
            }
            if (els.instructionModalOverlay) els.instructionModalOverlay.classList.add('hidden');
        });
    }

    // Import Modal Bindings
    els.importJsonBtn.addEventListener('click', () => {
        els.importJsonTextarea.value = '';
        els.importModalOverlay.classList.remove('hidden');
    });
    
    els.closeImportBtn.addEventListener('click', () => {
        els.importModalOverlay.classList.add('hidden');
    });
    
    els.applyImportBtn.addEventListener('click', handleImportPayload);
    
    // View JSON Modal Bindings
    if (els.closeJsonModalBtn) {
        els.closeJsonModalBtn.addEventListener('click', () => {
            els.jsonModalOverlay.classList.add('hidden');
        });
    }

    // Backdrop click to close modals
    if (els.jsonModalOverlay) {
        els.jsonModalOverlay.addEventListener('click', (e) => {
            if (e.target === els.jsonModalOverlay) {
                els.jsonModalOverlay.classList.add('hidden');
            }
        });
    }
    if (els.importModalOverlay) {
        els.importModalOverlay.addEventListener('click', (e) => {
            if (e.target === els.importModalOverlay) {
                els.importModalOverlay.classList.add('hidden');
            }
        });
    }
    if (els.instructionModalOverlay) {
        els.instructionModalOverlay.addEventListener('click', (e) => {
            if (e.target === els.instructionModalOverlay) {
                els.instructionModalOverlay.classList.add('hidden');
            }
        });
    }

    // Escape key closes modals
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (els.jsonModalOverlay) els.jsonModalOverlay.classList.add('hidden');
            if (els.importModalOverlay) els.importModalOverlay.classList.add('hidden');
            if (els.instructionModalOverlay) els.instructionModalOverlay.classList.add('hidden');
        }
    });
    
    // Bind Results Tabs
    els.resultsTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            els.resultsTabs.forEach(t => t.classList.remove('active'));
            els.resultsTabContents.forEach(c => c.classList.add('hidden'));
            tab.classList.add('active');
            const targetId = tab.getAttribute('data-target');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.remove('hidden');
            }
            if (targetId === 'tab-curl') {
                updateCurlDisplay();
            }
        });
    });
    
    // Reset prompt button
    els.resetPromptBtn.addEventListener('click', () => {
        const activeTab = state.testCases.find(t => t.id === state.activeTabId);
        if (activeTab) {
            const defaultPrompt = DEFAULT_PROMPTS[state.globalSettings.questionType] || DEFAULT_PROMPTS.Coding;
            activeTab.systemPrompt = defaultPrompt;
            activeTab.promptSource = 'system';
            els.systemPromptInput.value = defaultPrompt;
            updatePromptBadge('system');
            updatePromptLinesBadge(defaultPrompt);
            showToast('Prompt reset to default', 'info');
        }
    });
    
    logToConsole('System initialized. Default model: gemini-2.5-flash.', 'info');
}

// Toast Notifications
function showToast(message, type = 'info') {
    if (!els.toastContainer) return;
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    let icon = 'ℹ️';
    if (type === 'success') icon = '✓';
    if (type === 'error') icon = '⚠️';
    toast.innerHTML = `<span style="font-weight:bold;">${icon}</span> <span>${message}</span>`;
    els.toastContainer.appendChild(toast);
    setTimeout(() => {
        if (toast.parentNode) {
            toast.parentNode.removeChild(toast);
        }
    }, 2500);
}

// Copy to Clipboard (Swagger UI Style)
async function copyToClipboard(text, btnElement) {
    if (!text || text.trim() === '') {
        showToast('Nothing to copy', 'info');
        return;
    }
    
    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(text);
        } else {
            const textarea = document.createElement('textarea');
            textarea.value = text;
            textarea.style.position = 'fixed';
            textarea.style.left = '-9999px';
            document.body.appendChild(textarea);
            textarea.focus();
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
        }
        
        if (btnElement) {
            const originalHtml = btnElement.innerHTML;
            btnElement.classList.add('copied');
            btnElement.innerHTML = `
                <svg viewBox="0 0 24 24" width="14" height="14" stroke="#10b981" stroke-width="2.5" fill="none">
                    <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Copied!</span>
            `;
            setTimeout(() => {
                btnElement.classList.remove('copied');
                btnElement.innerHTML = originalHtml;
            }, 1500);
        }
        
        showToast('Copied to clipboard!', 'success');
    } catch (err) {
        console.error('Copy failed: ', err);
        showToast('Failed to copy text', 'error');
    }
}

// Delegated Copy Buttons Listener
function bindCopyButtons() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.copy-btn');
        if (!btn) return;
        const targetId = btn.getAttribute('data-target');
        if (!targetId) return;
        
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;
        
        let textToCopy = '';
        if (targetEl.tagName === 'TEXTAREA' || targetEl.tagName === 'INPUT') {
            textToCopy = targetEl.value;
        } else {
            textToCopy = targetEl.innerText || targetEl.textContent;
        }
        
        copyToClipboard(textToCopy, btn);
    });
}

// Delegated Clear Buttons Listener
function bindClearButtons() {
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('.clear-btn');
        if (!btn) return;
        const targetId = btn.getAttribute('data-target');
        if (!targetId) return;
        
        const targetEl = document.getElementById(targetId);
        if (!targetEl) return;
        
        targetEl.value = '';
        
        const activeTab = state.testCases.find(t => t.id === state.activeTabId);
        if (activeTab) {
            if (targetId === 'question-text') activeTab.questionText = '';
            if (targetId === 'answer-text') activeTab.answerText = '';
            if (targetId === 'system-prompt-text') {
                activeTab.systemPrompt = '';
                activeTab.promptSource = 'custom';
                updatePromptBadge('custom');
                updatePromptLinesBadge('');
            }
        }
        
        targetEl.focus();
        updateCurlDisplay();
        showToast('Cleared content', 'info');
    });
}

// Code Editor Tab Key Support
function bindTabIndentation() {
    if (!els.aTextInput) return;
    els.aTextInput.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            e.preventDefault();
            const start = els.aTextInput.selectionStart;
            const end = els.aTextInput.selectionEnd;
            const value = els.aTextInput.value;
            els.aTextInput.value = value.substring(0, start) + '  ' + value.substring(end);
            els.aTextInput.selectionStart = els.aTextInput.selectionEnd = start + 2;
            
            const activeTab = state.testCases.find(t => t.id === state.activeTabId);
            if (activeTab) activeTab.answerText = els.aTextInput.value;
        }
    });
}

// Collapsible Console Drawer
function bindConsoleDrawer() {
    if (!els.consoleHeaderToggle) return;
    els.consoleHeaderToggle.addEventListener('click', (e) => {
        if (e.target.closest('#clear-console-btn')) return;
        els.consoleDrawer.classList.toggle('collapsed');
    });

    if (els.clearConsoleBtn) {
        els.clearConsoleBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            els.consoleOutput.innerHTML = '';
            state.consoleLogCount = 0;
            if (els.consoleCount) els.consoleCount.textContent = '0';
            showToast('Console cleared', 'info');
        });
    }
}

// Auto-Fit Prompt Toggle
function bindPromptAutoFit() {
    if (!els.autoFitPromptBtn || !els.systemPromptInput) return;
    els.autoFitPromptBtn.addEventListener('click', () => {
        const textarea = els.systemPromptInput;
        const isFitted = textarea.classList.toggle('auto-fitted');
        if (isFitted) {
            textarea.style.height = `${textarea.scrollHeight + 10}px`;
            els.autoFitPromptBtn.textContent = '↕ Compact';
        } else {
            textarea.style.height = '';
            els.autoFitPromptBtn.textContent = '↕ Auto-Fit';
        }
    });
}

function updatePromptLinesBadge(text) {
    if (!els.promptLinesBadge) return;
    const lines = (text || '').split('\n').length;
    els.promptLinesBadge.textContent = `${lines} lines`;
}

// Results Panel Width Toggle
function bindResultsPanelToggle() {
    if (!els.resultsPanel) return;
    
    if (els.toggleResultsPanelBtn) {
        els.toggleResultsPanelBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            els.resultsPanel.classList.toggle('collapsed');
        });
    }

    const indicator = document.getElementById('results-collapsed-indicator');
    if (indicator) {
        indicator.addEventListener('click', (e) => {
            e.stopPropagation();
            els.resultsPanel.classList.remove('collapsed');
        });
    }

    els.resultsPanel.addEventListener('click', (e) => {
        if (els.resultsPanel.classList.contains('collapsed')) {
            els.resultsPanel.classList.remove('collapsed');
        }
    });
}

// Console Logic
function logToConsole(message, type = 'info') {
    if (!els.consoleOutput) return;
    state.consoleLogCount++;
    if (els.consoleCount) els.consoleCount.textContent = state.consoleLogCount;
    
    const timestamp = new Date().toLocaleTimeString();
    const logEl = document.createElement('div');
    logEl.className = `console-log ${type}`;
    logEl.innerHTML = `<span class="timestamp">[${timestamp}]</span> ${message}`;
    els.consoleOutput.appendChild(logEl);
    els.consoleOutput.scrollTop = els.consoleOutput.scrollHeight;
}

// Prompt Badge Update
function updatePromptBadge(source) {
    if (source === 'system') {
        els.promptSourceBadge.textContent = 'Using Default';
        els.promptSourceBadge.className = 'prompt-badge default';
        els.resetPromptBtn.classList.add('hidden');
    } else {
        els.promptSourceBadge.textContent = 'Custom';
        els.promptSourceBadge.className = 'prompt-badge custom';
        els.resetPromptBtn.classList.remove('hidden');
    }
}

function getDefaultPrompt() {
    return DEFAULT_PROMPTS[state.globalSettings.questionType] || DEFAULT_PROMPTS.Coding;
}

function updatePromptOptions() {
    els.promptSelect.innerHTML = '';
    if (state.globalSettings.questionType === 'Coding') {
        const opt = document.createElement('option');
        opt.value = 'code-eval';
        opt.textContent = 'Code Evaluation';
        els.promptSelect.appendChild(opt);
        state.globalSettings.prompt = 'code-eval';
    } else if (state.globalSettings.questionType === 'Concept') {
        const opt = document.createElement('option');
        opt.value = 'concept-eval';
        opt.textContent = 'Concept Evaluation';
        els.promptSelect.appendChild(opt);
        state.globalSettings.prompt = 'concept-eval';
    }
}

function bindGlobalSettings() {
    els.promptSelect.addEventListener('change', (e) => {
        state.globalSettings.prompt = e.target.value;
        updateCurlDisplay();
    });

    // Model Selector & Custom Model Input Binding
    els.modelSelect.addEventListener('change', (e) => {
        if (e.target.value === 'custom') {
            els.customModelInput.classList.remove('hidden');
            els.customModelInput.focus();
            state.globalSettings.model = els.customModelInput.value.trim() || 'custom';
        } else {
            els.customModelInput.classList.add('hidden');
            state.globalSettings.model = e.target.value;
        }
        updateCurlDisplay();
    });

    els.customModelInput.addEventListener('input', (e) => {
        state.globalSettings.model = e.target.value.trim() || 'custom';
        updateCurlDisplay();
    });

    els.languageSelect.addEventListener('change', (e) => {
        state.globalSettings.language = e.target.value;
        updateCurlDisplay();
    });

    els.tokenFlag.addEventListener('change', (e) => {
        state.globalSettings.llm_token_compute_flag = e.target.checked;
        updateCurlDisplay();
    });
    
    els.qTypeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            state.globalSettings.questionType = e.target.value;
            updatePromptOptions();
            
            state.testCases.forEach(tc => {
                if (tc.promptSource === 'system') {
                    tc.systemPrompt = getDefaultPrompt();
                }
            });
            
            updateFormFromState();
            updateCurlDisplay();
        });
    });
    
    updatePromptOptions();
}

function bindFormInputs() {
    const updateActiveTab = (field, value) => {
        const activeTab = state.testCases.find(t => t.id === state.activeTabId);
        if (activeTab) activeTab[field] = value;
        updateCurlDisplay();
    };

    els.qIdInput.addEventListener('input', (e) => updateActiveTab('questionId', e.target.value));
    els.qTextInput.addEventListener('input', (e) => updateActiveTab('questionText', e.target.value));
    els.aTextInput.addEventListener('input', (e) => updateActiveTab('answerText', e.target.value));
    
    els.systemPromptInput.addEventListener('input', (e) => {
        const activeTab = state.testCases.find(t => t.id === state.activeTabId);
        if (!activeTab) return;
        
        activeTab.systemPrompt = e.target.value;
        const defaultPrompt = getDefaultPrompt();
        if (e.target.value.trim() === defaultPrompt.trim()) {
            activeTab.promptSource = 'system';
            updatePromptBadge('system');
        } else {
            activeTab.promptSource = 'custom';
            updatePromptBadge('custom');
        }
        updatePromptLinesBadge(e.target.value);
        updateCurlDisplay();
    });
}

function renderTabs() {
    els.tabsList.innerHTML = '';
    
    state.testCases.forEach((tc, index) => {
        const btn = document.createElement('button');
        btn.className = `tab ${tc.id === state.activeTabId ? 'active' : ''}`;
        btn.innerHTML = `Case ${index + 1}`;
        
        btn.addEventListener('click', () => {
            state.activeTabId = tc.id;
            renderTabs();
            updateFormFromState();
            updateCurlDisplay();
        });

        if (state.testCases.length > 1) {
            const closeBtn = document.createElement('span');
            closeBtn.className = 'tab-close';
            closeBtn.innerHTML = '×';
            closeBtn.title = 'Remove';
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                removeTab(tc.id);
            });
            btn.appendChild(closeBtn);
        }
        
        els.tabsList.appendChild(btn);
    });

    const activeIndex = state.testCases.findIndex(t => t.id === state.activeTabId);
    if (els.tabMetaTag) {
        els.tabMetaTag.textContent = `Case ${activeIndex >= 0 ? activeIndex + 1 : 1} of ${state.testCases.length}`;
    }
}

function addNewTab() {
    const newId = `tab-${Date.now()}`;
    state.testCases.push({
        id: newId,
        questionId: `question-${state.testCases.length + 1}`,
        questionText: '',
        answerText: '',
        instructions: '',
        systemPrompt: getDefaultPrompt(),
        promptSource: 'system'
    });
    state.activeTabId = newId;
    renderTabs();
    updateFormFromState();
    updateCurlDisplay();
    showToast('New test case added', 'info');
}

function removeTab(id) {
    const index = state.testCases.findIndex(t => t.id === id);
    if (index > -1) {
        state.testCases.splice(index, 1);
        if (state.activeTabId === id) {
            state.activeTabId = state.testCases[Math.max(0, index - 1)].id;
        }
        renderTabs();
        updateFormFromState();
        updateCurlDisplay();
        showToast('Test case removed', 'info');
    }
}

function resetAllToDefault() {
    const qType = state.globalSettings.questionType || 'Coding';
    state.testCases = [
        {
            id: 'tab-1',
            questionId: 'question-1',
            questionText: '',
            answerText: '',
            instructions: '',
            systemPrompt: DEFAULT_PROMPTS[qType] || DEFAULT_PROMPTS.Coding,
            promptSource: 'system'
        }
    ];
    state.activeTabId = 'tab-1';
    state.evaluationId = 'evalidtest';
    
    // Reset results displays to default clean state
    if (els.resultsContent) {
        els.resultsContent.innerHTML = `
            <div class="empty-state">
                <div>Ready for evaluation</div>
                <div class="empty-subtitle">Click "Run Evaluation" or "Load Sample" to test.</div>
            </div>
        `;
    }
    if (els.curlDisplay) els.curlDisplay.textContent = 'Run evaluation or view payload to see cURL command...';
    if (els.requestDisplay) els.requestDisplay.textContent = 'Run evaluation to see request...';
    if (els.responseDisplay) els.responseDisplay.textContent = 'Run evaluation to see response...';
    
    renderTabs();
    updateFormFromState();
    updateCurlDisplay();
    showToast('All fields reset to default', 'info');
    logToConsole('Playground reset to fresh default state.', 'info');
}

function loadSampleCase() {
    const type = state.globalSettings.questionType;
    const sample = SAMPLES[type] || SAMPLES.Coding;
    
    const activeTab = state.testCases.find(t => t.id === state.activeTabId);
    if (activeTab) {
        activeTab.questionId = sample.questionId;
        activeTab.questionText = sample.questionText;
        activeTab.answerText = sample.answerText;
        activeTab.instructions = sample.instructions || '';
        activeTab.systemPrompt = getDefaultPrompt();
        activeTab.promptSource = 'system';
        
        if (sample.language) {
            state.globalSettings.language = sample.language;
            els.languageSelect.value = sample.language;
        }
        if (sample.model) {
            state.globalSettings.model = sample.model;
            els.modelSelect.value = sample.model;
            els.customModelInput.classList.add('hidden');
        }
        
        updateFormFromState();
        updateCurlDisplay();
        showToast(`Loaded ${type} sample!`, 'success');
        logToConsole(`Loaded ${type} evaluation sample.`, 'info');
    }
}

function updateInstructionBtnState(instructions) {
    if (!els.questionInstructionsBtn || !els.instructionBtnLabel) return;
    const hasInst = !!(instructions && instructions.trim());
    if (hasInst) {
        els.questionInstructionsBtn.classList.add('has-instructions');
        els.instructionBtnLabel.textContent = 'Instructions (Saved)';
        els.questionInstructionsBtn.title = 'Edit evaluation instructions for this question';
    } else {
        els.questionInstructionsBtn.classList.remove('has-instructions');
        els.instructionBtnLabel.textContent = '+ Instruction';
        els.questionInstructionsBtn.title = 'Add specific instructions/criteria for this question';
    }
}

function updateFormFromState() {
    const activeTab = state.testCases.find(t => t.id === state.activeTabId);
    if (activeTab) {
        els.qIdInput.value = activeTab.questionId;
        els.qTextInput.value = activeTab.questionText;
        els.aTextInput.value = activeTab.answerText;
        els.systemPromptInput.value = activeTab.systemPrompt;
        updatePromptBadge(activeTab.promptSource);
        updatePromptLinesBadge(activeTab.systemPrompt);
        updateInstructionBtnState(activeTab.instructions);
    }
}

function constructPayload() {
    return {
        evaluation_id: state.evaluationId,
        content: state.testCases.map(tc => ({
            question_id: tc.questionId,
            question_text: tc.questionText,
            prompt_source: tc.promptSource,
            answer_text: tc.answerText,
            instructions: (tc.instructions && tc.instructions.trim()) ? tc.instructions.trim() : null,
            system_prompt: tc.promptSource === 'custom' ? tc.systemPrompt : null
        })),
        language: state.globalSettings.language,
        llm_token_compute_flag: state.globalSettings.llm_token_compute_flag,
        model: state.globalSettings.model,
        type: state.globalSettings.questionType
    };
}

function generateCurlCommand(payload) {
    const baseUrl = (window.CONFIG && window.CONFIG.API_BASE_URL) ? window.CONFIG.API_BASE_URL.replace(/\/$/, "") : "http://localhost:8000";
    const url = `${baseUrl}/playground/evaluate`;
    const payloadJson = JSON.stringify(payload, null, 2);
    return `curl -X 'POST' \\\n  '${url}' \\\n  -H 'accept: application/json' \\\n  -H 'Content-Type: application/json' \\\n  -d '${payloadJson.replace(/'/g, "'\\''")}'`;
}

function updateCurlDisplay() {
    if (!els.curlDisplay) return;
    const payload = constructPayload();
    els.curlDisplay.textContent = generateCurlCommand(payload);
}

function showPayload() {
    const payload = constructPayload();
    els.jsonDisplay.textContent = JSON.stringify(payload, null, 2);
    if (els.jsonModalOverlay) {
        els.jsonModalOverlay.classList.remove('hidden');
    }
    updateCurlDisplay();
    
    showToast(`Generated JSON (${state.testCases.length} case(s))`, 'info');
    logToConsole(`Generated JSON payload with ${state.testCases.length} test case(s).`, 'info');
}

function handleImportPayload() {
    const jsonString = els.importJsonTextarea.value;
    try {
        const payload = JSON.parse(jsonString);
        
        if (payload.model) {
            state.globalSettings.model = payload.model;
            const optionExists = Array.from(els.modelSelect.options).some(o => o.value === payload.model);
            if (optionExists) {
                els.modelSelect.value = payload.model;
                els.customModelInput.classList.add('hidden');
            } else {
                els.modelSelect.value = 'custom';
                els.customModelInput.classList.remove('hidden');
                els.customModelInput.value = payload.model;
            }
        }
        if (payload.type) {
            state.globalSettings.questionType = payload.type;
            const radio = Array.from(els.qTypeRadios).find(r => r.value === payload.type);
            if (radio) radio.checked = true;
            updatePromptOptions();
        }
        if (payload.language) {
            state.globalSettings.language = payload.language;
            els.languageSelect.value = payload.language;
        }
        if (payload.llm_token_compute_flag !== undefined) {
            state.globalSettings.llm_token_compute_flag = payload.llm_token_compute_flag;
            els.tokenFlag.checked = payload.llm_token_compute_flag;
        }
        if (payload.evaluation_id) {
            state.evaluationId = payload.evaluation_id;
        }

        if (payload.content && Array.isArray(payload.content) && payload.content.length > 0) {
            state.testCases = payload.content.map((item, index) => {
                const isCustom = (item.prompt_source === 'custom' || !!item.system_prompt || (!!item.question_text && !item.instructions));
                
                let question = '';
                let instructions = '';
                let systemPrompt = '';
                
                if (item.system_prompt) {
                    // Modern format with custom system prompt override
                    question = item.question_text || '';
                    instructions = item.instructions || '';
                    systemPrompt = item.system_prompt;
                } else if (item.prompt_source === 'custom' && item.question_text && item.instructions) {
                    // Legacy format where question_text held system prompt and instructions held question
                    question = item.instructions;
                    instructions = '';
                    systemPrompt = item.question_text;
                } else {
                    // Standard format
                    question = item.question_text || item.instructions || '';
                    instructions = (item.instructions && item.instructions !== question) ? item.instructions : '';
                    systemPrompt = getDefaultPrompt();
                }

                return {
                    id: `tab-${Date.now()}-${index}`,
                    questionId: item.question_id || `question-${index + 1}`,
                    questionText: question,
                    answerText: item.answer_text || '',
                    instructions: instructions,
                    systemPrompt: systemPrompt,
                    promptSource: isCustom ? 'custom' : 'system'
                };
            });
            state.activeTabId = state.testCases[0].id;
            renderTabs();
            updateFormFromState();
        }
        
        els.importModalOverlay.classList.add('hidden');
        updateCurlDisplay();
        showToast(`Successfully imported ${state.testCases.length} test case(s)!`, 'success');
        logToConsole(`Successfully imported payload with ${state.testCases.length} test case(s).`, 'success');
        
    } catch (e) {
        showToast("Invalid JSON payload: " + e.message, 'error');
        logToConsole(`Failed to parse imported JSON: ${e.message}`, 'error');
    }
}

// Evaluation Run with Live Elapsed Timer, Shimmer Skeleton, and Positive/Negative Review Formatting
function runEvaluation() {
    const btn = els.runEvalBtn;
    const spinner = btn.querySelector('.btn-spinner');
    const btnText = btn.querySelector('.btn-text');
    
    btn.disabled = true;
    if (spinner) spinner.classList.remove('hidden');
    if (btnText) btnText.textContent = 'Evaluating...';
    
    // Ensure results panel is open to see results
    if (els.resultsPanel && els.resultsPanel.classList.contains('collapsed')) {
        els.resultsPanel.classList.remove('collapsed');
        if (els.toggleResultsPanelBtn) els.toggleResultsPanelBtn.textContent = '⇥ Collapse';
    }
    
    const startTime = performance.now();
    let timerInterval = null;
    
    // Switch to Score Tab by default
    els.resultsTabs[0].click();
    
    // Render Skeleton
    els.resultsContent.innerHTML = `
        <div class="skeleton-card fade-in">
            <div class="skeleton-line header"></div>
            <div class="eval-timer-badge">⏳ Calling model: <span id="live-eval-timer">0.0s</span></div>
            <div class="skeleton-line long"></div>
            <div class="skeleton-line medium"></div>
            <div class="skeleton-line metric-bar"></div>
            <div class="skeleton-line metric-bar"></div>
            <div class="skeleton-line short"></div>
        </div>
    `;
    
    const liveTimerEl = document.getElementById('live-eval-timer');
    timerInterval = setInterval(() => {
        const elapsed = ((performance.now() - startTime) / 1000).toFixed(1);
        if (liveTimerEl) liveTimerEl.textContent = `${elapsed}s`;
        if (btnText) btnText.textContent = `Evaluating... (${elapsed}s)`;
    }, 100);
    
    const requestPayload = constructPayload();
    els.requestDisplay.textContent = JSON.stringify(requestPayload, null, 2);
    els.responseDisplay.textContent = 'Waiting for response...';
    updateCurlDisplay();
    
    if (els.jsonModalOverlay) els.jsonModalOverlay.classList.add('hidden');

    const baseUrl = (window.CONFIG && window.CONFIG.API_BASE_URL) ? window.CONFIG.API_BASE_URL.replace(/\/$/, "") : "http://localhost:8000";
    fetch(`${baseUrl}/playground/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestPayload)
    })
    .then(response => {
        if (!response.ok) {
            return response.text().then(text => { throw new Error(`HTTP ${response.status}: ${text}`); });
        }
        return response.json();
    })
    .then(data => {
        clearInterval(timerInterval);
        const totalDuration = ((performance.now() - startTime) / 1000).toFixed(2);
        
        els.resultsContent.innerHTML = '';
        
        const activeTab = state.testCases.find(t => t.id === state.activeTabId);
        const evalResult = data.evaluations && data.evaluations.find(e => e.question_id === activeTab.questionId);
        
        if (!evalResult) {
            els.resultsContent.innerHTML = `
                <div class="score-card bad">
                    <div class="score-label">No Result Found</div>
                    <div class="score bad"><strong>—</strong></div>
                </div>
                <div class="feedback-box negative">No result was returned for Question ID: <code>${activeTab.questionId}</code>. Check the Response tab for full payload.</div>
            `;
            showToast('No result found for this tab', 'info');
        } else if (evalResult.status !== 'SUCCESS') {
            els.resultsContent.innerHTML = `
                <div class="score-card bad fade-in">
                    <div class="result-status-row">
                        <span class="badge danger">● Evaluation Failed</span>
                        <span class="time-tag">${totalDuration}s</span>
                    </div>
                    <div class="score-label" style="color:var(--danger)">Error Encountered</div>
                    <div class="score bad"><strong>0.0</strong> <span class="max-score">/ 10</span></div>
                </div>
                <div class="feedback-box negative fade-in">
                    <strong>Error Details:</strong><br>
                    ${evalResult.error || 'The model call failed to produce an evaluation.'}
                </div>
            `;
            showToast('Evaluation failed: ' + (evalResult.error || 'Unknown error'), 'error');
        } else {
            const review = evalResult.review.individual_reviews[0];
            const scores = review.scores;
            const overallScore = Number(scores.overall_score !== undefined ? scores.overall_score : 0);
            
            const clone = els.resultsTemplate.content.cloneNode(true);
            
            // Score tier categorization
            let scoreTier = 'good';
            let badgeClass = 'badge success';
            let badgeText = '● Passed';
            let feedbackClass = 'feedback-box';
            
            if (overallScore < 5.0) {
                scoreTier = 'bad';
                badgeClass = 'badge danger';
                badgeText = '● Needs Revision';
                feedbackClass = 'feedback-box negative';
            } else if (overallScore < 8.0) {
                scoreTier = 'moderate';
                badgeClass = 'badge warning';
                badgeText = '● Partial Pass';
                feedbackClass = 'feedback-box warning';
            }
            
            // Status & Time
            const statusBadge = clone.getElementById('eval-status-badge');
            if (statusBadge) {
                statusBadge.className = badgeClass;
                statusBadge.textContent = badgeText;
            }
            const timeTag = clone.getElementById('eval-time-tag');
            if (timeTag) timeTag.textContent = `${totalDuration}s`;
            
            // Score Card
            const scoreCard = clone.getElementById('eval-score-card');
            if (scoreCard) scoreCard.className = `score-card ${scoreTier}`;
            
            const scoreVal = clone.getElementById('eval-score-val');
            if (scoreVal) {
                scoreVal.className = `score ${scoreTier}`;
                scoreVal.innerHTML = `<strong>${overallScore.toFixed(1)}</strong> <span class="max-score">/ 10</span>`;
            }
            
            // Metrics helper
            const setMetric = (valId, progId, value) => {
                const valEl = clone.getElementById(valId);
                const progEl = clone.getElementById(progId);
                const num = Number(value || 0);
                if (valEl) valEl.textContent = `${num.toFixed(1)}/10`;
                if (progEl) {
                    progEl.value = num;
                    if (num < 5.0) progEl.className = 'metric-bad';
                    else if (num < 8.0) progEl.className = 'metric-moderate';
                    else progEl.className = 'metric-good';
                }
            };
            
            setMetric('metric-completeness-val', 'metric-completeness-prog', scores.completeness_score);
            setMetric('metric-quality-val', 'metric-quality-prog', scores.code_quality_score);
            setMetric('metric-approach-val', 'metric-approach-prog', scores.approach_taken_score);
            
            // Feedback
            const feedbackEl = clone.getElementById('eval-feedback-text');
            if (feedbackEl) {
                feedbackEl.className = feedbackClass;
                feedbackEl.textContent = review.correctness_feedback || "No feedback provided.";
            }
            
            els.resultsContent.appendChild(clone);
            showToast(`Evaluation completed in ${totalDuration}s (Score: ${overallScore.toFixed(1)})`, overallScore >= 5 ? 'success' : 'info');
        }
        
        els.responseDisplay.textContent = JSON.stringify(data, null, 2);
        logToConsole(`Evaluation completed in ${totalDuration}s using ${state.globalSettings.model}.`, 'info');
    })
    .catch(err => {
        clearInterval(timerInterval);
        els.resultsContent.innerHTML = `
            <div class="score-card bad fade-in">
                <div class="score-label" style="color:var(--danger)">Network / Server Error</div>
                <div class="score bad" style="font-size:1.3rem;"><strong>Failed</strong></div>
            </div>
            <div class="feedback-box negative fade-in">
                <strong>Error:</strong> ${err.message}<br><br>
                <em>Check console output or verify the backend is running at ${window.CONFIG ? window.CONFIG.API_BASE_URL : "http://localhost:8000"}.</em>
            </div>
        `;
        els.responseDisplay.textContent = String(err);
        showToast(`Evaluation error: ${err.message}`, 'error');
        logToConsole(`Evaluation failed: ${err.message}`, 'error');
    })
    .finally(() => {
        clearInterval(timerInterval);
        btn.disabled = false;
        if (spinner) spinner.classList.add('hidden');
        if (btnText) btnText.textContent = '▶ Run Evaluation';
    });
}

// Run init on load
document.addEventListener('DOMContentLoaded', init);
