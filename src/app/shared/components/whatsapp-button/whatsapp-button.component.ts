import { Component } from '@angular/core';

@Component({
    selector: 'app-whatsapp-button',
    standalone: true,
    host: { class: 'whatsapp-action' },
    styleUrl: './whatsapp-button.component.css',
    template: `
    <a
      class="whatsapp-action__link"
      href="https://wa.me/201043881766"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with RAI Link Supplies on WhatsApp"
      title="WhatsApp"
    >
      <svg
        class="whatsapp-icon"
        viewBox="0 0 32 32"
        width="28"
        height="28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M16 2a13.94 13.94 0 0 0-12 21.03L2 30l7.17-1.88A13.95 13.95 0 1 0 16 2Zm0 25.5a11.5 11.5 0 0 1-5.87-1.6l-.42-.25-4.36 1.14 1.16-4.25-.28-.44A11.52 11.52 0 1 1 16 27.5Zm6.32-8.62c-.35-.17-2.06-1.02-2.38-1.13-.32-.12-.55-.17-.78.17-.23.35-.9 1.13-1.1 1.36-.2.23-.4.26-.75.09a9.47 9.47 0 0 1-2.78-1.71 10.44 10.44 0 0 1-1.92-2.39c-.2-.35-.02-.54.15-.71.16-.16.35-.4.53-.6.18-.2.23-.35.35-.58.12-.23.06-.43-.03-.6-.09-.17-.78-1.88-1.07-2.58-.28-.68-.57-.59-.78-.6h-.67c-.23 0-.6.09-.92.43s-1.21 1.18-1.21 2.87 1.24 3.33 1.41 3.56c.17.23 2.44 3.73 5.92 5.23.83.36 1.48.57 1.98.73.83.26 1.59.22 2.19.13.67-.1 2.06-.84 2.35-1.65.29-.81.29-1.51.2-1.66-.08-.14-.31-.23-.66-.4Z"
          fill="currentColor"
        />
      </svg>
    </a>
  `,
})
export class WhatsappButtonComponent { }