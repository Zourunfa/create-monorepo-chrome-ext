import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true })
}

// Copy public files to dist
const publicDir = path.join(rootDir, 'public')
copyDir(publicDir, distDir)

// Copy package builds to dist
const packages = ['popup', 'background', 'content-script', 'options']
packages.forEach(pkg => {
  const pkgDistDir = path.join(rootDir, 'packages', pkg, 'dist')
  const targetDir = path.join(distDir, pkg)
  
  if (fs.existsSync(pkgDistDir)) {
    copyDir(pkgDistDir, targetDir)
  }
})

console.log('✓ Build completed! Extension is ready in dist/ folder')

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true })
  
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}
