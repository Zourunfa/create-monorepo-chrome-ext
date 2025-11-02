#!/usr/bin/env node

import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import prompts from 'prompts'
import { red, green, cyan, yellow, bold } from 'kolorist'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const FRAMEWORKS = [
  { name: 'vue', display: 'Vue', color: green },
  { name: 'react', display: 'React', color: cyan }
]

const LANGUAGES = [
  { name: 'js', display: 'JavaScript', color: yellow },
  { name: 'ts', display: 'TypeScript', color: cyan }
]

async function init() {
  console.log(bold(cyan('\n🚀 Create Monorepo Chrome Extension\n')))

  const args = process.argv.slice(2)
  let targetDir = args[0] || 'my-chrome-extension'

  let result = {}

  try {
    result = await prompts(
      [
        {
          type: 'text',
          name: 'projectName',
          message: 'Project name:',
          initial: targetDir,
          onState: (state) => {
            targetDir = state.value.trim() || targetDir
          }
        },
        {
          type: 'select',
          name: 'framework',
          message: 'Select a framework:',
          choices: FRAMEWORKS.map((f) => ({
            title: f.color(f.display),
            value: f.name
          }))
        },
        {
          type: 'select',
          name: 'language',
          message: 'Select a language:',
          choices: LANGUAGES.map((l) => ({
            title: l.color(l.display),
            value: l.name
          }))
        }
      ],
      {
        onCancel: () => {
          throw new Error(red('✖') + ' Operation cancelled')
        }
      }
    )
  } catch (cancelled) {
    console.log(cancelled.message)
    return
  }

  const { framework, language } = result
  const templateDir = path.join(__dirname, '..', 'templates', `${framework}-${language}`)
  const root = path.join(process.cwd(), targetDir)

  if (!fs.existsSync(templateDir)) {
    console.log(red(`Template ${framework}-${language} not found!`))
    return
  }

  if (fs.existsSync(root)) {
    console.log(red(`Directory ${targetDir} already exists!`))
    return
  }

  console.log(cyan(`\n📁 Creating project in ${root}...\n`))

  fs.mkdirSync(root, { recursive: true })

  // Copy template files
  copyDir(templateDir, root)

  // Update package.json with project name
  const pkgPath = path.join(root, 'package.json')
  if (fs.existsSync(pkgPath)) {
    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
    pkg.name = targetDir
    fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2))
  }

  console.log(green('✓') + ' Project created successfully!\n')
  console.log(bold('Next steps:\n'))
  console.log(`  cd ${targetDir}`)
  console.log(`  pnpm install`)
  console.log(`  pnpm dev`)
  console.log()
}

function copyDir(srcDir, destDir) {
  fs.mkdirSync(destDir, { recursive: true })
  
  for (const file of fs.readdirSync(srcDir)) {
    const srcFile = path.join(srcDir, file)
    const destFile = path.join(destDir, file)
    
    const stat = fs.statSync(srcFile)
    if (stat.isDirectory()) {
      copyDir(srcFile, destFile)
    } else {
      fs.copyFileSync(srcFile, destFile)
    }
  }
}

init().catch((e) => {
  console.error(e)
})
