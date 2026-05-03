import { useEffect, useState } from "react";

const DEFAULT_PHONE = "919999999999";
const DEFAULT_MESSAGE =
  "Hi Leads Rubix team — I'd like to know more about your CRM and pricing.";

export function WhatsAppFab({
  phone = DEFAULT_PHONE,
  message = DEFAULT_MESSAGE,
}: {
  phone?: string;
  message?: string;
}) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const href = `https://wa.me/${phone.replace(/[^0-9]/g, "")}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      data-testid="link-whatsapp-fab"
      className="fixed z-30 bottom-4 right-4 h-12 w-12 md:h-14 md:w-14 rounded-full bg-[#25D366] hover:bg-[#1FB755] shadow-xl shadow-[#25D366]/30 flex items-center justify-center transition-transform hover:scale-105"
    >
      <svg
        viewBox="0 0 32 32"
        className="h-6 w-6 md:h-7 md:w-7 text-white fill-current"
        aria-hidden="true"
      >
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.81 3.41 4.918 4.151.518.187 2.18.59 2.728.59.515 0 1.39-.214 1.776-.518.302-.244.47-.748.47-1.146 0-.157-.043-.314-.086-.45-.114-.286-2.32-1.396-2.508-1.41zm-3.137 6.08h-.014a9.234 9.234 0 0 1-4.692-1.286l-.334-.2-3.473.92.926-3.376-.214-.343a9.084 9.084 0 0 1-1.4-4.853c0-5.034 4.107-9.13 9.143-9.13 2.443 0 4.736.948 6.46 2.674a9.103 9.103 0 0 1 2.665 6.46c0 5.033-4.116 9.135-9.07 9.135zm7.797-16.927A10.954 10.954 0 0 0 15.978 3.13c-6.082 0-11.035 4.953-11.043 11.035 0 1.943.51 3.84 1.473 5.512l-1.566 5.71 5.853-1.532a11.043 11.043 0 0 0 5.273 1.343h.013c6.083 0 11.043-4.953 11.052-11.035 0-2.95-1.143-5.71-3.236-7.795z" />
      </svg>
    </a>
  );
}
