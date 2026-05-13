/* ============================================================
   LeadsRubix Lead Capture Popup — popup.js
   Place this file in: public_html/popup.js
   ============================================================ */

(function () {
    'use strict';

    const GATE_KEY = 'lr_gate_hidden_until';
    const HIDE_HOURS = 24;
    const SHEET_URL = 'https://script.google.com/macros/s/AKfycbxq0_z-MJCjVrfRTuDno12qfrAcag4ox6m6fFM2W0pNPIWnssmjvCM99ef8jGch8VURLg/exec';
   
    // Several redirect URLs are used in different places during development/testing. Update as needed.
      const REDIRECT_URL  = 'https://leadsrubix.com/';

    // local host testing URL (uncomment during local dev)
    // const REDIRECT_URL = 'http://localhost:3000/';

    const INTEREST_OPTIONS = [
        'Digital Services',
        'Job Interview'
    ];

    const COUNTRY_DIAL_CODES = [
        { code: '+93', label: 'Afghanistan (+93)' },
        { code: '+355', label: 'Albania (+355)' },
        { code: '+213', label: 'Algeria (+213)' },
        { code: '+376', label: 'Andorra (+376)' },
        { code: '+244', label: 'Angola (+244)' },
        { code: '+54', label: 'Argentina (+54)' },
        { code: '+374', label: 'Armenia (+374)' },
        { code: '+61', label: 'Australia (+61)' },
        { code: '+43', label: 'Austria (+43)' },
        { code: '+994', label: 'Azerbaijan (+994)' },
        { code: '+973', label: 'Bahrain (+973)' },
        { code: '+880', label: 'Bangladesh (+880)' },
        { code: '+375', label: 'Belarus (+375)' },
        { code: '+32', label: 'Belgium (+32)' },
        { code: '+501', label: 'Belize (+501)' },
        { code: '+229', label: 'Benin (+229)' },
        { code: '+975', label: 'Bhutan (+975)' },
        { code: '+591', label: 'Bolivia (+591)' },
        { code: '+387', label: 'Bosnia and Herzegovina (+387)' },
        { code: '+267', label: 'Botswana (+267)' },
        { code: '+55', label: 'Brazil (+55)' },
        { code: '+359', label: 'Bulgaria (+359)' },
        { code: '+226', label: 'Burkina Faso (+226)' },
        { code: '+257', label: 'Burundi (+257)' },
        { code: '+855', label: 'Cambodia (+855)' },
        { code: '+237', label: 'Cameroon (+237)' },
        { code: '+1', label: 'Canada (+1)' },
        { code: '+238', label: 'Cape Verde (+238)' },
        { code: '+236', label: 'Central African Republic (+236)' },
        { code: '+235', label: 'Chad (+235)' },
        { code: '+56', label: 'Chile (+56)' },
        { code: '+86', label: 'China (+86)' },
        { code: '+57', label: 'Colombia (+57)' },
        { code: '+269', label: 'Comoros (+269)' },
        { code: '+242', label: 'Congo (+242)' },
        { code: '+243', label: 'Congo, DR (+243)' },
        { code: '+506', label: 'Costa Rica (+506)' },
        { code: '+385', label: 'Croatia (+385)' },
        { code: '+53', label: 'Cuba (+53)' },
        { code: '+357', label: 'Cyprus (+357)' },
        { code: '+420', label: 'Czech Republic (+420)' },
        { code: '+45', label: 'Denmark (+45)' },
        { code: '+253', label: 'Djibouti (+253)' },
        { code: '+593', label: 'Ecuador (+593)' },
        { code: '+20', label: 'Egypt (+20)' },
        { code: '+503', label: 'El Salvador (+503)' },
        { code: '+240', label: 'Equatorial Guinea (+240)' },
        { code: '+291', label: 'Eritrea (+291)' },
        { code: '+372', label: 'Estonia (+372)' },
        { code: '+251', label: 'Ethiopia (+251)' },
        { code: '+358', label: 'Finland (+358)' },
        { code: '+33', label: 'France (+33)' },
        { code: '+220', label: 'Gambia (+220)' },
        { code: '+995', label: 'Georgia (+995)' },
        { code: '+49', label: 'Germany (+49)' },
        { code: '+233', label: 'Ghana (+233)' },
        { code: '+30', label: 'Greece (+30)' },
        { code: '+502', label: 'Guatemala (+502)' },
        { code: '+224', label: 'Guinea (+224)' },
        { code: '+245', label: 'Guinea-Bissau (+245)' },
        { code: '+592', label: 'Guyana (+592)' },
        { code: '+509', label: 'Haiti (+509)' },
        { code: '+504', label: 'Honduras (+504)' },
        { code: '+36', label: 'Hungary (+36)' },
        { code: '+354', label: 'Iceland (+354)' },
        { code: '+91', label: 'India (+91)' },
        { code: '+62', label: 'Indonesia (+62)' },
        { code: '+98', label: 'Iran (+98)' },
        { code: '+964', label: 'Iraq (+964)' },
        { code: '+353', label: 'Ireland (+353)' },
        { code: '+972', label: 'Israel (+972)' },
        { code: '+39', label: 'Italy (+39)' },
        { code: '+225', label: 'Ivory Coast (+225)' },
        { code: '+81', label: 'Japan (+81)' },
        { code: '+962', label: 'Jordan (+962)' },
        { code: '+7', label: 'Kazakhstan (+7)' },
        { code: '+254', label: 'Kenya (+254)' },
        { code: '+965', label: 'Kuwait (+965)' },
        { code: '+996', label: 'Kyrgyzstan (+996)' },
        { code: '+856', label: 'Laos (+856)' },
        { code: '+371', label: 'Latvia (+371)' },
        { code: '+961', label: 'Lebanon (+961)' },
        { code: '+266', label: 'Lesotho (+266)' },
        { code: '+231', label: 'Liberia (+231)' },
        { code: '+218', label: 'Libya (+218)' },
        { code: '+423', label: 'Liechtenstein (+423)' },
        { code: '+370', label: 'Lithuania (+370)' },
        { code: '+352', label: 'Luxembourg (+352)' },
        { code: '+261', label: 'Madagascar (+261)' },
        { code: '+265', label: 'Malawi (+265)' },
        { code: '+60', label: 'Malaysia (+60)' },
        { code: '+960', label: 'Maldives (+960)' },
        { code: '+223', label: 'Mali (+223)' },
        { code: '+356', label: 'Malta (+356)' },
        { code: '+222', label: 'Mauritania (+222)' },
        { code: '+230', label: 'Mauritius (+230)' },
        { code: '+52', label: 'Mexico (+52)' },
        { code: '+373', label: 'Moldova (+373)' },
        { code: '+377', label: 'Monaco (+377)' },
        { code: '+976', label: 'Mongolia (+976)' },
        { code: '+382', label: 'Montenegro (+382)' },
        { code: '+212', label: 'Morocco (+212)' },
        { code: '+258', label: 'Mozambique (+258)' },
        { code: '+95', label: 'Myanmar (+95)' },
        { code: '+264', label: 'Namibia (+264)' },
        { code: '+977', label: 'Nepal (+977)' },
        { code: '+31', label: 'Netherlands (+31)' },
        { code: '+64', label: 'New Zealand (+64)' },
        { code: '+505', label: 'Nicaragua (+505)' },
        { code: '+227', label: 'Niger (+227)' },
        { code: '+234', label: 'Nigeria (+234)' },
        { code: '+47', label: 'Norway (+47)' },
        { code: '+968', label: 'Oman (+968)' },
        { code: '+92', label: 'Pakistan (+92)' },
        { code: '+507', label: 'Panama (+507)' },
        { code: '+595', label: 'Paraguay (+595)' },
        { code: '+51', label: 'Peru (+51)' },
        { code: '+63', label: 'Philippines (+63)' },
        { code: '+48', label: 'Poland (+48)' },
        { code: '+351', label: 'Portugal (+351)' },
        { code: '+974', label: 'Qatar (+974)' },
        { code: '+40', label: 'Romania (+40)' },
        { code: '+7', label: 'Russia (+7)' },
        { code: '+250', label: 'Rwanda (+250)' },
        { code: '+966', label: 'Saudi Arabia (+966)' },
        { code: '+221', label: 'Senegal (+221)' },
        { code: '+381', label: 'Serbia (+381)' },
        { code: '+248', label: 'Seychelles (+248)' },
        { code: '+232', label: 'Sierra Leone (+232)' },
        { code: '+65', label: 'Singapore (+65)' },
        { code: '+421', label: 'Slovakia (+421)' },
        { code: '+386', label: 'Slovenia (+386)' },
        { code: '+27', label: 'South Africa (+27)' },
        { code: '+82', label: 'South Korea (+82)' },
        { code: '+34', label: 'Spain (+34)' },
        { code: '+94', label: 'Sri Lanka (+94)' },
        { code: '+249', label: 'Sudan (+249)' },
        { code: '+597', label: 'Suriname (+597)' },
        { code: '+268', label: 'Swaziland (+268)' },
        { code: '+46', label: 'Sweden (+46)' },
        { code: '+41', label: 'Switzerland (+41)' },
        { code: '+963', label: 'Syria (+963)' },
        { code: '+886', label: 'Taiwan (+886)' },
        { code: '+992', label: 'Tajikistan (+992)' },
        { code: '+255', label: 'Tanzania (+255)' },
        { code: '+66', label: 'Thailand (+66)' },
        { code: '+228', label: 'Togo (+228)' },
        { code: '+216', label: 'Tunisia (+216)' },
        { code: '+90', label: 'Turkey (+90)' },
        { code: '+993', label: 'Turkmenistan (+993)' },
        { code: '+256', label: 'Uganda (+256)' },
        { code: '+380', label: 'Ukraine (+380)' },
        { code: '+971', label: 'United Arab Emirates (+971)' },
        { code: '+44', label: 'United Kingdom (+44)' },
        { code: '+1', label: 'United States (+1)' },
        { code: '+598', label: 'Uruguay (+598)' },
        { code: '+998', label: 'Uzbekistan (+998)' },
        { code: '+58', label: 'Venezuela (+58)' },
        { code: '+84', label: 'Vietnam (+84)' },
        { code: '+967', label: 'Yemen (+967)' },
        { code: '+260', label: 'Zambia (+260)' },
        { code: '+263', label: 'Zimbabwe (+263)' }
    ];

    /* ── Spam guard: remember if a submission was just made ── */
    let isSubmitting = false;

    /* ── 24-hour gate ──────────────────────────────────────── */
    function shouldShowGate() {
        try {
            const hiddenUntil = localStorage.getItem(GATE_KEY);
            if (!hiddenUntil) return true;
            return Date.now() > parseInt(hiddenUntil, 10);
        } catch (e) {
            return true; // if localStorage unavailable, just show
        }
    }

    function hideGateFor24h() {
        try {
            const until = Date.now() + HIDE_HOURS * 60 * 60 * 1000;
            localStorage.setItem(GATE_KEY, String(until));
        } catch (e) { /* ignore */ }
    }

    function showGate() {
        const gate = document.getElementById('lr-popup-overlay');
        if (!gate) return;
        document.body.classList.add('lr-gate-active');
        gate.classList.add('lr-visible');
        gate.removeAttribute('aria-hidden');
        const first = gate.querySelector('input, select, textarea');
        if (first) first.focus();
    }

    function hideGate() {
        const gate = document.getElementById('lr-popup-overlay');
        if (!gate) return;
        gate.classList.remove('lr-visible');
        gate.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('lr-gate-active');
        hideGateFor24h();
    }

    function populateCountryCodes(form) {
        const dialCodeInput = form.querySelector('[data-field="dialCode"]');
        const dropdown = form.querySelector('#lr-country-dropdown');
        const toggle = form.querySelector('#lr-country-toggle');
        const valueEl = form.querySelector('#lr-country-value');
        const menu = form.querySelector('#lr-country-menu');

        if (!dialCodeInput || !dropdown || !toggle || !valueEl || !menu) return;

        let selected = dialCodeInput.value || '+91';
        dialCodeInput.value = selected;
        valueEl.textContent = selected;
        menu.innerHTML = '';

        COUNTRY_DIAL_CODES.forEach(({ code, label }) => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'lr-country-option';
            btn.setAttribute('role', 'option');
            btn.setAttribute('data-code', code);
            btn.innerHTML = `<span class="lr-country-code">${code}</span><span>${label.replace(` (${code})`, '')}</span>`;

            if (code === selected) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            }

            btn.addEventListener('click', () => {
                selected = code;
                dialCodeInput.value = code;
                valueEl.textContent = code;
                menu.querySelectorAll('.lr-country-option').forEach(opt => {
                    opt.classList.remove('active');
                    opt.removeAttribute('aria-selected');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });

            li.appendChild(btn);
            menu.appendChild(li);
        });

        function scrollToSelectedOption() {
            const activeOption = menu.querySelector('.lr-country-option.active');
            if (!activeOption) return;
            activeOption.scrollIntoView({ block: 'center' });
        }

        toggle.addEventListener('click', () => {
            const isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
            if (isOpen) {
                requestAnimationFrame(scrollToSelectedOption);
            }
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    function populateInterestOptions(form) {
        const interestInput = form.querySelector('[data-field="interest"]');
        const dropdown = form.querySelector('#lr-interest-dropdown');
        const toggle = form.querySelector('#lr-interest-toggle');
        const valueEl = form.querySelector('#lr-interest-value');
        const menu = form.querySelector('#lr-interest-menu');

        if (!interestInput || !dropdown || !toggle || !valueEl || !menu) return;

        let selected = interestInput.value || '';
        valueEl.textContent = selected || 'Select an option';
        valueEl.classList.toggle('lr-placeholder', !selected);
        menu.innerHTML = '';

        INTEREST_OPTIONS.forEach((optionText) => {
            const li = document.createElement('li');
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'lr-country-option';
            btn.setAttribute('role', 'option');
            btn.setAttribute('data-value', optionText);
            btn.textContent = optionText;

            if (optionText === selected) {
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
            }

            btn.addEventListener('click', () => {
                selected = optionText;
                interestInput.value = optionText;
                valueEl.textContent = optionText;
                valueEl.classList.remove('lr-placeholder');

                menu.querySelectorAll('.lr-country-option').forEach(opt => {
                    opt.classList.remove('active');
                    opt.removeAttribute('aria-selected');
                });

                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            });

            li.appendChild(btn);
            menu.appendChild(li);
        });

        toggle.addEventListener('click', () => {
            const isOpen = dropdown.classList.toggle('open');
            toggle.setAttribute('aria-expanded', String(isOpen));
        });

        document.addEventListener('click', (e) => {
            if (!dropdown.contains(e.target)) {
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                dropdown.classList.remove('open');
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
    }

    /* ── Validation ─────────────────────────────────────────── */
    function validateForm(data) {
        const errors = {};

        if (!data.name || data.name.trim().length < 2)
            errors.name = 'Please enter your full name.';

        const phoneDigits = data.phone.replace(/\D/g, '');
        if (!phoneDigits || phoneDigits.length < 7 || phoneDigits.length > 15)
            errors.phone = 'Enter a valid phone number.';

        const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!data.email || !emailRe.test(data.email.trim()))
            errors.email = 'Enter a valid email address.';

        if (!data.interest)
            errors.interest = 'Please select an option.';

        if (!data.consent)
            errors.consent = 'Consent is required.';

        return errors;
    }

    function clearErrors(form) {
        form.querySelectorAll('.lr-field-error').forEach(el => (el.textContent = ''));
        form.querySelectorAll('.lr-error').forEach(el => el.classList.remove('lr-error'));
        const interestToggle = form.querySelector('#lr-interest-toggle');
        if (interestToggle) interestToggle.classList.remove('lr-error');
    }

    function showErrors(form, errors) {
        Object.entries(errors).forEach(([field, msg]) => {
            const input = form.querySelector(`[data-field="${field}"]`);
            const errEl = form.querySelector(`[data-error="${field}"]`);
            if (field === 'interest') {
                const interestToggle = form.querySelector('#lr-interest-toggle');
                if (interestToggle) interestToggle.classList.add('lr-error');
            } else if (input) {
                input.classList.add('lr-error');
            }
            if (errEl) errEl.textContent = msg;
        });
        // Focus first invalid field
        const firstField = Object.keys(errors)[0];
        const el = form.querySelector(`[data-field="${firstField}"]`);
        if (el) el.focus();
    }

    /* ── Set button loading state ───────────────────────────── */
    function setLoading(btn, loading) {
        btn.disabled = loading;
        if (loading) {
            btn.classList.add('lr-loading');
        } else {
            btn.classList.remove('lr-loading');
        }
    }

    /* ── Show success panel & redirect ─────────────────────── */
    function showSuccess() {
        const form = document.getElementById('lr-lead-form');
        const success = document.getElementById('lr-success-msg');
        if (form) form.style.display = 'none';
        if (success) success.style.display = 'block';

        // Hide lead gate and continue to site
        setTimeout(() => {
            hideGate();
            window.location.href = REDIRECT_URL;
        }, 2500);
    }

    /* ── Submit handler ─────────────────────────────────────── */
    async function handleSubmit(e) {
        e.preventDefault();
        if (isSubmitting) return;

        const form = e.target;
        const btn = document.getElementById('lr-submit-btn');

        // Build payload
        const dialCode = form.querySelector('[data-field="dialCode"]').value;
        const phone = form.querySelector('[data-field="phone"]').value.trim();
        const data = {
            name: form.querySelector('[data-field="name"]').value.trim(),
            phone: phone,
            dialCode: dialCode,
            fullPhone: dialCode + phone,
            email: form.querySelector('[data-field="email"]').value.trim(),
            interest: form.querySelector('[data-field="interest"]').value,
            consent: !!form.querySelector('[data-field="consent"]')?.checked,
            // Backward-compatible fields for APIs expecting city/message
            city: form.querySelector('[data-field="interest"]').value || 'N/A',
            message: form.querySelector('[data-field="interest"]').value || '',
        };

        // Validate
        clearErrors(form);
        const errors = validateForm(data);
        if (Object.keys(errors).length) {
            showErrors(form, errors);
            return;
        }

        isSubmitting = true;
        setLoading(btn, true);

        try {
            const now = new Date();
            const dateStr = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()} ${now.getHours()}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;

            const payload = {
                // Keys for current Apps Script (data.name, data.countrycode, etc.)
                name: data.name,
                countrycode: data.dialCode.replace('+', ''),
                phone: data.phone,
                email: data.email,
                website: window.location.hostname,
                contactfor: data.interest,
                ip: '',

                // Keys for direct sheet column mapping (if script uses these)
                Date: dateStr,
                Name: data.name,
                'country-code': data.dialCode.replace('+', ''),
                Phone: data.phone,
                Email: data.email,
                Website: window.location.hostname,
                ContactFor: data.interest,
                Ip: '',
                Taken: 'No',
                'Taken on Date': ''
            };

            await fetch(SHEET_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            showSuccess();
        } catch (err) {
            console.error('[LeadsRubix] Submission error:', err);
            const errEl = document.getElementById('lr-submit-error');
            if (errEl) {
                errEl.textContent = 'Something went wrong. Please try again.';
                errEl.style.display = 'block';
            }
        } finally {
            setLoading(btn, false);
            isSubmitting = false;
        }
    }

    /* ── Init ───────────────────────────────────────────────── */
    function init() {
        const gate = document.getElementById('lr-popup-overlay');
        const form = document.getElementById('lr-lead-form');

        if (!gate || !form) return;

        populateCountryCodes(form);
        populateInterestOptions(form);

        if (shouldShowGate()) {
            showGate();
        } else {
            gate.style.display = 'none';
            document.body.classList.remove('lr-gate-active');
        }

        // Attach form submit
        form.addEventListener('submit', handleSubmit);

        // Clear error on input
        form.querySelectorAll('input, textarea, select').forEach(el => {
            el.addEventListener('input', () => {
                el.classList.remove('lr-error');
                const field = el.dataset.field;
                if (field) {
                    const errEl = form.querySelector(`[data-error="${field}"]`);
                    if (errEl) errEl.textContent = '';
                }
                const submitErr = document.getElementById('lr-submit-error');
                if (submitErr) submitErr.style.display = 'none';
            });
        });
    }

    // Wait for DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
