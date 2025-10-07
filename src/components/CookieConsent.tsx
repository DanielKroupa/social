"use client";

import { useState, useEffect } from "react";
import {
  getCookie,
  setCookie,
  COOKIE_TYPES,
  type CookieSettings,
} from "@/utils/cookies";

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [cookieSettings, setCookieSettings] = useState<CookieSettings>({
    necessary: true, // Always enabled
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has previously set cookies
    const consent = getCookie("cookieConsent");
    if (!consent) {
      setShowConsent(true);
    } else {
      try {
        const savedSettings = JSON.parse(consent);
        setCookieSettings(savedSettings);
      } catch (e) {
        setShowConsent(true);
      }
    }
  }, []);

  const saveCookieSettings = (settings: CookieSettings) => {
    setCookie("cookieConsent", JSON.stringify(settings));
    setShowConsent(false);
  };

  const acceptAllCookies = () => {
    const allAccepted = {
      necessary: true,
      analytics: true,
      marketing: true,
    };
    setCookieSettings(allAccepted);
    saveCookieSettings(allAccepted);
  };

  const saveCustomSettings = () => {
    saveCookieSettings(cookieSettings);
  };

  const declineCookies = () => {
    const allDeclined = {
      necessary: true, // Essential cookies always enabled
      analytics: false,
      marketing: false,
    };
    setCookieSettings(allDeclined);
    saveCookieSettings(allDeclined);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 p-4 shadow-lg z-50 transition-all duration-300 ease-in-out">
      <div className="max-w-7xl mx-auto flex flex-col gap-4">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="text-sm text-gray-700 dark:text-gray-300">
            <p className="mb-2">
              We use cookies to enhance your browsing experience. Some are
              essential for the website to function properly, while others help
              us improve and offer you personalized content.
            </p>
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 underline"
            >
              {showDetails ? "Hide details" : "Show details"}
            </button>
          </div>
          <div className="flex gap-4">
            <button
              onClick={declineCookies}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Decline optional
            </button>
            <button
              onClick={acceptAllCookies}
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              Accept all
            </button>
          </div>
        </div>

        {showDetails && (
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Essential Cookies
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  These cookies are necessary for the website to function
                  properly and cannot be disabled.
                </p>
              </div>
              <input
                type="checkbox"
                checked={cookieSettings.necessary}
                disabled
                className="h-4 w-4 rounded border-gray-300"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Analytics Cookies
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Help us understand how you use the website so we can improve
                  it.
                </p>
              </div>
              <input
                type="checkbox"
                checked={cookieSettings.analytics}
                onChange={(e) =>
                  setCookieSettings({
                    ...cookieSettings,
                    analytics: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-gray-900 dark:text-gray-100">
                  Marketing Cookies
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Used to display relevant advertising on other websites.
                </p>
              </div>
              <input
                type="checkbox"
                checked={cookieSettings.marketing}
                onChange={(e) =>
                  setCookieSettings({
                    ...cookieSettings,
                    marketing: e.target.checked,
                  })
                }
                className="h-4 w-4 rounded border-gray-300"
              />
            </div>

            <div className="flex justify-end">
              <button
                onClick={saveCustomSettings}
                className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Save settings
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CookieConsent;
