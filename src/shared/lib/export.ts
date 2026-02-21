import { toPng } from 'html-to-image'
import JSZip from 'jszip'
import { saveAs } from 'file-saver'

export async function exportSingleSlide(
  element: HTMLElement,
  filename: string
): Promise<void> {
  try {
    const dataUrl = await toPng(element, {
      width: 1080,
      height: 1350,
      pixelRatio: 2,
      cacheBust: true,
    })

    // Convert data URL to blob
    const response = await fetch(dataUrl)
    const blob = await response.blob()

    // Download the file
    saveAs(blob, filename)
  } catch (error) {
    console.error('Error exporting slide:', error)
    throw new Error('Failed to export slide')
  }
}

export async function exportAllSlides(
  elements: HTMLElement[],
  prefix: string
): Promise<void> {
  try {
    const zip = new JSZip()

    // Export each slide
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i]
      const filename = `${prefix}_slide_${String(i + 1).padStart(2, '0')}.png`

      const dataUrl = await toPng(element, {
        width: 1080,
        height: 1350,
        pixelRatio: 2,
        cacheBust: true,
      })

      // Convert data URL to blob
      const response = await fetch(dataUrl)
      const blob = await response.blob()

      // Add to zip
      zip.file(filename, blob)
    }

    // Generate zip file
    const zipBlob = await zip.generateAsync({ type: 'blob' })

    // Download zip
    saveAs(zipBlob, `${prefix}_all_slides.zip`)
  } catch (error) {
    console.error('Error exporting all slides:', error)
    throw new Error('Failed to export all slides')
  }
}
