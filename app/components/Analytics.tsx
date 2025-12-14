'use client'

import { useEffect } from 'react'
import Script from 'next/script'
import { environment } from '@/config/environment'

interface AnalyticsProps {
  gaMeasurementId?: string
  gtmContainerId?: string
}

export default function Analytics({ 
  gaMeasurementId = environment.analytics.googleAnalytics.measurementId,
  gtmContainerId = environment.analytics.googleTagManager.containerId 
}: AnalyticsProps) {
  useEffect(() => {
    // Initialiser les analytics côté client si nécessaire
    if (typeof window !== 'undefined' && gaMeasurementId) {
      // Google Analytics 4
      window.gtag = window.gtag || function() {
        (window.gtag as any).q = (window.gtag as any).q || []
        ;(window.gtag as any).q.push(arguments)
      }
      
      window.gtag('js', new Date())
      window.gtag('config', gaMeasurementId, {
        page_title: document.title,
        page_location: window.location.href,
      })
    }
  }, [gaMeasurementId])

  // Fonction pour envoyer des événements personnalisés
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value,
      })
    }
  }

  // Fonction pour suivre les clics sur les liens
  const trackLinkClick = (url: string, linkText: string) => {
    trackEvent('click', 'link', linkText)
  }

  // Fonction pour suivre les soumissions de formulaire
  const trackFormSubmit = (formName: string) => {
    trackEvent('submit', 'form', formName)
  }

  // Fonction pour suivre les téléchargements
  const trackDownload = (fileName: string) => {
    trackEvent('download', 'file', fileName)
  }

  // Exposer les fonctions de tracking globalement
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).trackEvent = trackEvent
      ;(window as any).trackLinkClick = trackLinkClick
      ;(window as any).trackFormSubmit = trackFormSubmit
      ;(window as any).trackDownload = trackDownload
    }
  }, [])

  return (
    <>
      {/* Google Analytics 4 */}
      {gaMeasurementId && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${gaMeasurementId}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${gaMeasurementId}', {
                page_title: document.title,
                page_location: window.location.href,
              });
            `}
          </Script>
        </>
      )}

      {/* Google Tag Manager */}
      {gtmContainerId && (
        <>
          <Script id="google-tag-manager" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmContainerId}');
            `}
          </Script>
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmContainerId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        </>
      )}

      {/* Hotjar (optionnel) */}
      {process.env.NEXT_PUBLIC_HOTJAR_ID && (
        <Script id="hotjar" strategy="afterInteractive">
          {`
            (function(h,o,t,j,a,r){
              h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
              h._hjSettings={hjid:${process.env.NEXT_PUBLIC_HOTJAR_ID},hjsv:6};
              a=o.getElementsByTagName('head')[0];
              r=o.createElement('script');r.async=1;
              r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
              a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
          `}
        </Script>
      )}

      {/* Facebook Pixel (optionnel) */}
      {process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID && (
        <Script id="facebook-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  )
}

// Hook pour utiliser les analytics dans les composants
export function useAnalytics() {
  const trackEvent = (action: string, category: string, label?: string, value?: number) => {
    if (typeof window !== 'undefined' && (window as any).trackEvent) {
      ;(window as any).trackEvent(action, category, label, value)
    }
  }

  const trackPageView = (page: string) => {
    trackEvent('page_view', 'navigation', page)
  }

  const trackButtonClick = (buttonName: string) => {
    trackEvent('click', 'button', buttonName)
  }

  const trackFormInteraction = (formName: string, action: 'start' | 'complete' | 'error') => {
    trackEvent(action, 'form', formName)
  }

  const trackScroll = (percentage: number) => {
    trackEvent('scroll', 'engagement', 'scroll_depth', percentage)
  }

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackFormInteraction,
    trackScroll,
  }
} 