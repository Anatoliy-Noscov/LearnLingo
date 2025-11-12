// Скрипт для загрузки данных преподавателей в Firebase
// Запуск: node scripts/uploadTeachers.js

const { initializeApp } = require('firebase/app');
const { getDatabase, ref, set } = require('firebase/database');

// Конфигурация Firebase (используйте ваши реальные данные)
const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  databaseURL: "https://your-project-default-rtdb.firebaseio.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

// Данные преподавателей из вашего JSON файла
const teachersData = [
  {
    "name": "John",
    "surname": "Doe",
    "languages": ["English", "Spanish"],
    "levels": ["A1 Beginner", "A2 Elementary", "B1 Intermediate", "B2 Upper-Intermediate", "C1 Advanced", "C2 Proficient"],
    "rating": 4.5,
    "reviews": [
      {
        "reviewer_name": "Alice",
        "reviewer_rating": 5,
        "comment": "John is an excellent teacher! I highly recommend him."
      },
      {
        "reviewer_name": "Bob",
        "reviewer_rating": 4,
        "comment": "John is very knowledgeable and patient. I enjoyed his classes."
      }
    ],
    "price_per_hour": 25,
    "lessons_done": 1375,
    "avatar_url": "https://ftp.goit.study/img/avatars/1.jpg",
    "lesson_info": "The lessons focus on improving speaking and listening skills through interactive activities and discussions.",
    "conditions": ["Teaches only adult learners (18 years and above).", "Flexible scheduling options available."],
    "experience": "John has been teaching languages for 7 years and has extensive experience in helping students improve their language skills. He has successfully taught numerous students from different backgrounds and proficiency levels."
  }
  // Добавьте остальных преподавателей из вашего JSON
];

async function uploadTeachers() {
  try {
    const app = initializeApp(firebaseConfig);
    const database = getDatabase(app);
    
    console.log('Starting teachers upload...');
    
    for (let i = 0; i < teachersData.length; i++) {
      const teacher = teachersData[i];
      const teacherId = `teacher_${i + 1}`;
      
      await set(ref(database, `teachers/${teacherId}`), teacher);
      console.log(`Uploaded teacher: ${teacher.name} ${teacher.surname} (${teacherId})`);
    }
    
    console.log('All teachers uploaded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error uploading teachers:', error);
    process.exit(1);
  }
}

uploadTeachers();