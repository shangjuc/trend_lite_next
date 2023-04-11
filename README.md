Trend-lite-next 開發筆記



# Q&A

## window is not defined 

問題描述:

在twc.jsx中引用npm 的wordcloud，由於預設global是window，但實際執行環境可能是server下的node.js，就會出現

window is not defined 這種錯誤。

```jsx
// src/components/twc.jsx
import WordCloud from 'wordcloud';
```

```tsx
// src/pages/word-cloud.tsx
import TrendWordCloud from '../components/trend_word_cloud/twc';
```

解法:

參考: https://www.codingdeft.com/posts/next-window-not-defined/

重點在於，要將哪個import改成dynamic import，嘗試後發現，不是將 WordCloud 的import修改，而是要將TrendWordCloud 修改成dynamic import。

```tsx
// src/pages/word-cloud.tsx
import dynamic from 'next/dynamic'
const TrendWordCloud = dynamic(() => import('../components/trend_word_cloud/twc'), { ssr: false })
```



## 同時使用tsx及jsx的問題

解法:

錯誤解法: 在根目錄建立 .babelrc ，然後內容如下:

```json
// .babelrc
{
    "presets": [
        "next/babel"
    ],
    "plugins": []
}
```

實際運行後會報錯。



正確(?)解法: 修改tsconfig.json，在 "include" 中新增 `"**/*.js", "**/*.jsx"`

```json
// tsconfig.json
{  
    "compilerOptions": {
        "allowJs": true,
        "jsx": "preserve",
        "incremental": true,
        "paths": {
          "@/*": ["./src/*"]
        }
      },
    "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
}
```





## npm run build的錯誤



解法:

可能是node version的問題，改用node v16以上的版本。使用wsl並安裝相應版本，或是用nvm去切換版本。



# 官方文件



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:4500](http://localhost:4500) with your browser to see the result.


You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:4500/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.





