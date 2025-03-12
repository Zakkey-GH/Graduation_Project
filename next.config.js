/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    rules: {
      '@typescript-eslint/no-unused-vars': 'warn', // または 'off'
    },
  },
}

module.exports = nextConfig 