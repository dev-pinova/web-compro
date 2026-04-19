import { db } from "./index";
import { portfolio, post, testimonial } from "./schema";

async function seed() {
  console.log("Seeding database...");

  // Seed Portfolio
  const projects = [
    { title: "Modern Minimalist House", category: "Bangun Rumah", imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80" },
    { title: "Contemporary Kitchen Reno", category: "Renovasi Rumah", imageUrl: "https://images.unsplash.com/photo-1600566753190-17f0bac269a4?auto=format&fit=crop&w=1200&q=80" },
    { title: "Luxury Penthouse Interior", category: "Interior", imageUrl: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80" },
  ];

  for (const prj of projects) {
    await db.insert(portfolio).values(prj);
  }

  // Seed Blog
  const blogPosts = [
    {
      title: "5 Tips Memilih Material Bangunan Berkulitas untuk Rumah Modern",
      slug: "tips-memilih-material-bangunan",
      excerpt: "Memilih material yang tepat adalah kunci utama kekuatan dan estetika rumah Anda...",
      category: "Tips Bangun Rumah",
      author: "Toni Anugrah",
      date: "12 Apr 2024",
      imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80",
    },
    {
      title: "Mengapa Anda Membutuhkan Jasa Arsitek Profesional?",
      slug: "manfaat-jasa-arsitek-profesional",
      excerpt: "Banyak orang ragu menggunakan jasa arsitek. Faktanya, arsitek dapat menghemat budget Anda...",
      category: "Tren Arsitektur",
      author: "Tim AJD",
      date: "02 Apr 2024",
      imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80",
    },
  ];

  for (const bp of blogPosts) {
    await db.insert(post).values(bp);
  }

  // Seed Testimonials
  const reviews = [
    { name: "Bpk. Heru Prasetyo", role: "Pemilik Rumah Tinggal", comment: "Sangat puas dengan hasilnya. Detail pengerjaannya sangat rapi dan tim sangat komunikatif.", avatarUrl: "https://i.pravatar.cc/150?u=heru" },
    { name: "Ibu Maya Shanti", role: "Pengelola Cafe", comment: "Desain interiornya sangat sesuai dengan konsep yang saya inginkan. Cafe jadi lebih ramai!", avatarUrl: "https://i.pravatar.cc/150?u=maya" },
  ];

  for (const r of reviews) {
    await db.insert(testimonial).values(r);
  }

  console.log("Seeding completed successfully!");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
  process.exit(1);
});
