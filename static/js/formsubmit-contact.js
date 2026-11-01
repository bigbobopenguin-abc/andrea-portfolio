/* Contact form via FormSubmit.co. Designed to coexist with main.js's old mailto handler. */
(() => {
  'use strict';
  const EMAIL = 'andrealee1406@gmail.com';
  const attach = () => {
    const form = document.getElementById('contactForm');
    if (!form || form.dataset.formsubmitReady === 'true') return;
    form.dataset.formsubmitReady = 'true';

    const get = id => document.getElementById(id);
    const status = get('formStatus');
    const button = form.querySelector('button[type="submit"]');
    if (status) { status.setAttribute('role','status'); status.setAttribute('aria-live','polite'); }

    // Capture phase prevents the existing main.js handler from launching mailto:.
    form.addEventListener('submit', async event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!form.reportValidity() || form.dataset.sending === 'true') return;
      const fields = {
        name: get('name')?.value.trim() ?? '',
        email: get('email')?.value.trim() ?? '',
        subject: get('subject')?.value.trim() ?? '',
        message: get('message')?.value.trim() ?? ''
      };
      if (!fields.name || !fields.email || !fields.subject || !fields.message) return;

      form.dataset.sending = 'true';
      if (button) { button.disabled = true; button.textContent = 'Sending…'; }
      if (status) status.textContent = 'Sending your message…';

      try {
        const response = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(EMAIL)}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            name: fields.name,
            email: fields.email,
            subject: fields.subject,
            message: fields.message,
            _subject: `Portfolio enquiry: ${fields.subject}`,
            _template: 'table',
            _captcha: 'false',
            _url: location.href
          })
        });
        const result = await response.json();
        if (!response.ok || (result.success !== true && result.success !== 'true')) {
          throw new Error(result.message || 'FormSubmit did not confirm delivery.');
        }
        if (status) status.textContent = 'Message submitted. Thank you!';
        form.reset();
      } catch (error) {
        console.error('Contact form:', error);
        if (status) status.textContent = 'Unable to send right now. Please try again or email me directly.';
      } finally {
        form.dataset.sending = 'false';
        if (button) { button.disabled = false; button.textContent = 'Send message ↗'; }
      }
    }, { capture: true });
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attach, {once:true});
  } else attach();
})();
