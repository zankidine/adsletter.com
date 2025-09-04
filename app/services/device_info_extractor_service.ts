import type { HttpContext } from '@adonisjs/core/http'
import { UAParser } from 'ua-parser-js'

// Interface pour les informations sur le device
interface DeviceInfo {
  device: 'Mobile' | 'Desktop' | 'Tablet' | 'Unknown'
  browser: string
  os: string
  isMobile: boolean
  isTablet: boolean
  isDesktop: boolean
}

// Interface pour la réponse du service
interface DeviceInfoExtractorServiceProps {
  deviceInfo: DeviceInfo
  ipAddress: string
  userAgent: string
}

export class DeviceInfoExtractorService {
  private uaParser: UAParser

  constructor() {
    this.uaParser = new UAParser()
  }

  /**
   * Extrait les informations de l'appareil à partir de la requête HTTP
   * @param request - La requête HTTP d'AdonisJS
   * @returns Les informations extraites sur l'appareil
   */
  extractFromRequest(request: HttpContext['request']): DeviceInfoExtractorServiceProps {
    const userAgent = request.header('user-agent') ?? 'Unknown'
    const ipAddress = request.ip() ?? 'Unknown'

    // Utilisation de ua-parser-js pour analyser l'User-Agent
    this.uaParser.setUA(userAgent)
    const result = this.uaParser.getResult()

    // Détection du type d'appareil
    const deviceType = this.getDeviceType(result)

    const deviceInfo: DeviceInfo = {
      device: deviceType,
      browser: result.browser.name ?? 'Unknown',
      os: result.os.name ?? 'Unknown',
      isMobile: deviceType === 'Mobile',
      isTablet: deviceType === 'Tablet',
      isDesktop: deviceType === 'Desktop',
    }

    return {
      deviceInfo,
      ipAddress,
      userAgent,
    }
  }

  /**
   * Détermine le type d'appareil à partir du résultat de UAParser
   * @param result - Résultat de l'analyse de l'User-Agent
   * @returns Type d'appareil
   */
  private getDeviceType(result: UAParser.IResult): 'Mobile' | 'Desktop' | 'Tablet' | 'Unknown' {
    const device = result.device.type
    if (device === 'mobile') return 'Mobile'
    if (device === 'tablet') return 'Tablet'
    if (!device) return 'Desktop' // Par défaut, un appareil sans type est considéré comme Desktop
    return 'Unknown'
  }
}