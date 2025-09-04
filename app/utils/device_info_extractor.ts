import type { HttpContext } from '@adonisjs/core/http'

export class DeviceInfoExtractor {
  /**
   * Extrait les informations de l'appareil depuis la requête HTTP
   */
  static extractFromRequest(request: HttpContext['request']): {
    deviceInfo: any
    ipAddress: string
    userAgent: string
  } {
    const userAgent = request.header('user-agent') || 'Unknown'
    const isMobile = request.header('sec-ch-ua-mobile') === '?1'
    
    // Extraction basique du navigateur depuis le User-Agent
    let browser = 'Unknown'
    if (userAgent.includes('Chrome')) browser = 'Chrome'
    else if (userAgent.includes('Firefox')) browser = 'Firefox'
    else if (userAgent.includes('Safari')) browser = 'Safari'
    else if (userAgent.includes('Edge')) browser = 'Edge'

    // Extraction basique de l'OS depuis le User-Agent
    let os = 'Unknown'
    if (userAgent.includes('Windows')) os = 'Windows'
    else if (userAgent.includes('Mac')) os = 'macOS'
    else if (userAgent.includes('Linux')) os = 'Linux'
    else if (userAgent.includes('Android')) os = 'Android'
    else if (userAgent.includes('iOS')) os = 'iOS'

    const deviceInfo = {
      device: isMobile ? 'Mobile' : 'Desktop',
      browser,
      os,
      isMobile,
      isTablet: false, // Pourrait être amélioré
      isDesktop: !isMobile,
    }

    return {
      deviceInfo,
      ipAddress: request.ip(),
      userAgent,
    }
  }
}
