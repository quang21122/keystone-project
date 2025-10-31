---

# 🎯 **CHỦ ĐỀ: HEADLESS CMS**

---

## **I. Giới thiệu chung về Headless CMS**

### 🧩 1️⃣ Khái niệm

* **Headless CMS** là hệ thống quản lý nội dung (Content Management System) **tách rời phần backend (nơi lưu trữ & quản lý nội dung)** khỏi **frontend (phần hiển thị giao diện)**.
* Thay vì hiển thị nội dung trực tiếp như WordPress truyền thống, Headless CMS **cung cấp dữ liệu thông qua API (REST hoặc GraphQL)** để frontend tự do xử lý và hiển thị.

👉 *Nói đơn giản:* CMS chỉ “giữ đầu não” — còn phần hiển thị do bạn tự thiết kế.

---

### ⚖️ 2️⃣ So sánh với CMS truyền thống

| Tiêu chí      | CMS truyền thống (Coupled)  | Headless CMS                            |
| ------------- | --------------------------- | --------------------------------------- |
| Cấu trúc      | Backend & Frontend gắn liền | Tách rời hoàn toàn                      |
| Cách hiển thị | Render HTML trực tiếp       | Cung cấp dữ liệu qua API                |
| Ngôn ngữ      | Thường giới hạn (PHP)       | Tự do (React, Vue, Flutter, Next.js...) |
| Linh hoạt     | Thấp                        | Rất cao                                 |
| Hiệu năng     | Nặng, khó mở rộng           | Nhẹ, dễ mở rộng đa nền tảng             |

---

### 💡 3️⃣ Ưu điểm nổi bật

* **API-first:** Tích hợp linh hoạt với nhiều hệ thống khác nhau.
* **Đa nền tảng:** Một nguồn dữ liệu – hiển thị được trên web, mobile, smartwatch, kiosk...
* **Tự do công nghệ:** Dùng bất kỳ frontend framework nào.
* **Hiệu năng & bảo mật tốt hơn:** Frontend tách biệt giúp giảm tải và tăng khả năng bảo vệ dữ liệu.
* **Quản trị nội dung tập trung:** Dễ dàng quản lý bài viết, trang, hình ảnh cho nhiều nền tảng.

---

## **II. Các use case phổ biến của Headless CMS**

### 🌍 1️⃣ Website, Blog, Landing Page

→ Quản lý bài viết, trang marketing, banner… mà không phụ thuộc layout cố định.
Ví dụ: dùng Next.js để hiển thị nội dung từ CMS.

### 📱 2️⃣ Ứng dụng Mobile và IoT

→ Cung cấp dữ liệu nội dung qua API cho ứng dụng Android/iOS hoặc thiết bị thông minh (ví dụ đồng hồ, TV...).

### 🔄 3️⃣ Đa kênh nội dung (Omnichannel)

→ Một CMS có thể xuất dữ liệu ra nhiều kênh khác nhau cùng lúc: website, app, chatbot, thiết bị quảng cáo, v.v.

🧠 *Thực tế:* Nike, Spotify, The New York Times đều dùng Headless CMS để đồng bộ nội dung đa nền tảng.

---

## **III. Kiến trúc & Workflow của Headless CMS**

### ⚙️ 1️⃣ Kiến trúc tổng quan

```
   [Admin UI]  ←→  [Headless CMS Backend]  ←→  [Database]
                              ↓
               [REST/GraphQL API Layer]
                              ↓
      [Web Frontend]   [Mobile App]   [IoT Device]
```

**Các thành phần chính:**

* **Admin UI:** Giao diện cho người quản trị nhập và chỉnh sửa nội dung.
* **Backend CMS:** Quản lý cấu trúc dữ liệu (Post, Product, Page...).
* **API Layer:** Cầu nối cung cấp dữ liệu ra ngoài.
* **Frontend:** Website hoặc ứng dụng gọi API để hiển thị nội dung.

---

### 🔄 2️⃣ Quy trình làm việc cơ bản

1. **Tạo content type** (ví dụ: Post, Product, Page).
2. **Nhập dữ liệu** qua giao diện admin.
3. **Fetch dữ liệu** từ frontend thông qua REST hoặc GraphQL API.
4. **Render nội dung** trên website, app, hoặc bất kỳ nền tảng nào.

---

## **IV. Demo Headless CMS – KeystoneJS**

### 🧱 1️⃣ Giới thiệu KeystoneJS

* **KeystoneJS** là một **Headless CMS mã nguồn mở** viết bằng **Node.js**.
* Cung cấp **giao diện Admin UI tự động**, **API GraphQL mạnh mẽ**, và dễ mở rộng bằng mã JavaScript.
* Hỗ trợ nhiều cơ sở dữ liệu như PostgreSQL, SQLite, MySQL (thông qua Prisma ORM).

---

### ⚙️ 2️⃣ Cài đặt KeystoneJS

```bash
# Tạo project mới
npx create-keystone-app my-keystone-app
cd my-keystone-app
npm install
npm run dev
```

Mặc định Keystone chạy ở **[http://localhost:3000](http://localhost:3000)**
→ Đây là trang quản trị nội dung.

---

### 🧩 3️⃣ Cấu hình Schema (ví dụ: Post)

```js
// file: schema.ts
import { list } from '@keystone-6/core';
import { text, relationship, timestamp } from '@keystone-6/core/fields';

export const lists = {
  Post: list({
    fields: {
      title: text({ validation: { isRequired: true } }),
      content: text(),
      createdAt: timestamp({ defaultValue: { kind: 'now' } }),
    },
  }),
};
```

👉 Khi khởi động lại server, Keystone sẽ tự tạo bảng và API GraphQL tương ứng.

---

### ✍️ 4️⃣ Demo thao tác

* Truy cập **http://localhost:3000** → chọn “Post” → tạo mới bài viết.
* Các trường “title”, “content”, “createdAt” hiển thị rõ ràng trên giao diện.
* Keystone tự động cập nhật schema và API khi bạn thay đổi code.

---

### 🧠 5️⃣ Fetch dữ liệu qua GraphQL API

**GraphQL Playground:**
[http://localhost:3000/api/graphql](http://localhost:3000/api/graphql)

**Truy vấn ví dụ:**

```graphql
query: `
    {
    posts {
        id
        title
        content {
            document
            }
        }
    }
`
```

→ Kết quả trả về dạng JSON, sẵn sàng hiển thị ở frontend (React, Next.js...).

---

## **V. Triển khai Self-hosted Keystone CMS**

### 🧰 1️⃣ Chuẩn bị môi trường

* **Node.js >= 18**
* **MySQL hoặc PostgreSQL** (qua Prisma)

---

### 🔐 3️⃣ Phân quyền & người dùng

* Keystone hỗ trợ **Authentication** và **Session** module.
* Có thể tạo các vai trò như: Admin, Editor, Viewer.
* Phân quyền chi tiết trên từng model hoặc field.

---

## **VI. Kết nối frontend với Keystone**

### 🔗 1️⃣ Fetch dữ liệu qua GraphQL (ReactJS ví dụ)

```tsx
  useEffect(() => {
    fetch('http://localhost:3000/api/graphql', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          {
            posts {
              id
              title
              content {
                document
              }
            }
          }
        `,
      }),
    })
      .then((res) => res.json())
      .then((result) => setPosts(result.data.posts))
      .catch((err) => console.error(err));
  }, []);
```

### 💻 2️⃣ Hiển thị nội dung

```jsx
{posts.map(post => (
  <article key={post.id}>
    <h2>{post.title}</h2>
    <p>{post.content}</p>
  </article>
))}
```

→ Dữ liệu từ Keystone được hiển thị trực tiếp trên website ReactJS.

---

## **VII. Đánh giá & Kết luận**

### ✅ Ưu điểm của Headless CMS

* Linh hoạt, hiện đại, dễ tích hợp.
* API mạnh (GraphQL, REST).
* Tách biệt frontend/backend → dễ bảo trì và mở rộng.
* Hỗ trợ phát triển nhanh và chuẩn hoá dữ liệu.

### ❌ Nhược điểm

* Cần kỹ năng lập trình để xây frontend.
* Cài đặt ban đầu phức tạp hơn CMS truyền thống.
* Quản lý hosting và bảo mật API là trách nhiệm của dev team.

---

### 🌟 Một số Headless CMS phổ biến

| Tên CMS         | Loại        | Điểm nổi bật                      |
| --------------- | ----------- | --------------------------------- |
| **KeystoneJS**  | Open Source | Node.js, GraphQL, dễ tùy biến     |
| **Strapi**      | Open Source | REST & GraphQL, UI thân thiện     |
| **Directus**    | Open Source | UI đẹp, kết nối DB sẵn có         |
| **Payload CMS** | Open Source | Viết bằng TypeScript, bảo mật cao |
| **Contentful**  | SaaS        | Ổn định, nhiều tích hợp           |

---

### 💡 Gợi ý cho dự án thực tế

* Nếu bạn muốn **kiểm soát mã nguồn, tự host** → dùng **Keystone** hoặc **Payload**.
* Nếu cần **triển khai nhanh, có giao diện quản lý sẵn** → chọn **Directus** hoặc **Contentful**.

---

## **VIII. Q&A**

🗣️ *Mời các bạn đặt câu hỏi, góp ý hoặc chia sẻ trải nghiệm với CMS mà nhóm đã dùng.*

---

## **Phụ lục / Tài liệu tham khảo**

* 🔗 [https://keystonejs.com/](https://keystonejs.com/)
* 🔗 [https://strapi.io/](https://strapi.io/)
* 🔗 [https://directus.io/](https://directus.io/)
* 🔗 [https://payloadcms.com/](https://payloadcms.com/)
* 🔗 [https://contentful.com/](https://contentful.com/)

---
