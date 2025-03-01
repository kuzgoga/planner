import { H3Event, EventHandlerRequest, use } from "h3";
import { User } from "~/server/entities/user.entity";
import { Event } from "~/server/entities/event.entity";
import { In } from "typeorm";
import { genSaltSync, hashSync } from "bcrypt-ts";

async function createSampleData(events: H3Event): Promise<void> {
  await addUsers();
  await addEvents();
}

async function addUsers() {
  if ((await User.count()) < 4) {
    const salt = genSaltSync(Number(process.env.SALT_ROUNDS));
    const password = hashSync("12345678", salt);

    await User.create({
      email: "kuzgoga@goga.ru",
      password_hash: password,
      firstName: "Куз",
      lastName: "Гога",
      role: Role.PARTICIPANT,
    }).save();

    await User.create({
      email: "undersky@goga.ru",
      password_hash: password,
      firstName: "Поднебесный",
      lastName: "Алексей",
      role: Role.PARTICIPANT,
    }).save();

    await User.create({
      email: "gofman@goga.ru",
      password_hash: password,
      firstName: "Игорь",
      lastName: "Гофман",
      role: Role.ORGANIZER,
    }).save();

    await User.create({
      email: "umk@gkl-kemerovo.ru",
      password_hash: password,
      firstName: "Герман",
      lastName: "Нефтебаза",
      role: Role.ADMIN,
    }).save();
  }
}

async function addEvents() {
  if ((await Event.count()) < 10) {
    // Event 1 - 1 day duration, starts now
    await Event.create({
      title: "Конференция",
      description: "Описание конференции",
      start: new Date(),
      end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      location: "Кемерово",
      preview_path:
        "https://ir-5.ozone.ru/s3/multimedia-t/wc1000/6832978517.jpg",
      likes: [1],
      participants: await User.findBy({ id: In([1]) }),
    }).save();

    // Event 2 - 3 hour duration, starts tomorrow
    const tomorrowStart = new Date(
      new Date().setHours(10, 0, 0, 0) + 24 * 60 * 60 * 1000,
    );
    await Event.create({
      title: "Семинар",
      description: "Описание семинара",
      start: tomorrowStart,
      end: new Date(tomorrowStart.getTime() + 1000 * 60 * 60 * 3),
      location: "г.Кемерово, ул Красная 5А",
      preview_path:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      likes: [2],
      participants: await User.findBy({ id: In([2]) }),
    }).save();

    // Event 3 - 2 hour duration, starts in 3 days
    const threeDaysLater = new Date(
      new Date().setHours(14, 30, 0, 0) + 3 * 24 * 60 * 60 * 1000,
    );
    await Event.create({
      title: "Вебинар",
      description: "Описание вебинара",
      start: threeDaysLater,
      end: new Date(threeDaysLater.getTime() + 1000 * 60 * 60 * 2),
      location: "г. Кемерово, жилой район Кедровка, ул. Ленина 1А",
      preview_path:
        "https://images.unsplash.com/photo-1591115765373-5207764f72e4",
      likes: [3],
      participants: await User.findBy({ id: In([1]) }),
    }).save();

    // Event 4 - 5 hour duration, starts next week
    const nextWeek = new Date(
      new Date().setHours(9, 0, 0, 0) + 7 * 24 * 60 * 60 * 1000,
    );
    await Event.create({
      title: "Мастер-класс",
      description: "Описание мастер-класса",
      start: nextWeek,
      end: new Date(nextWeek.getTime() + 1000 * 60 * 60 * 5),
      location: "г. Кемерово, ул. Спартака 1А",
      preview_path:
        "https://images.unsplash.com/photo-1517457373958-b7bdd4587205",
      likes: [],
      participants: await User.findBy({ id: In([1, 2]) }),
    }).save();

    // Event 5 - 30 minute duration, starts in 2 hours
    const twoHoursLater = new Date(new Date().getTime() + 1000 * 60 * 60 * 2);
    await Event.create({
      title: "Встреча с экспертом",
      description: "Короткая встреча по обмену опытом",
      start: twoHoursLater,
      end: new Date(twoHoursLater.getTime() + 1000 * 60 * 30),
      location: "г. Кемерово, пр. Ленина 90",
      preview_path:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      likes: [1, 3],
      participants: await User.findBy({ id: In([3]) }),
    }).save();

    // Event 6 - 2 day duration, starts in 5 days
    const fiveDaysLater = new Date(
      new Date().setHours(12, 0, 0, 0) + 5 * 24 * 60 * 60 * 1000,
    );
    await Event.create({
      title: "Выставка технологий",
      description: "Двухдневная выставка новейших технологий",
      start: fiveDaysLater,
      end: new Date(fiveDaysLater.getTime() + 1000 * 60 * 60 * 48),
      location: "г. Кемерово, ул. Тухачевского 58",
      preview_path:
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c",
      likes: [2],
      participants: await User.findBy({ id: In([1, 2, 3]) }),
    }).save();

    // Event 7 - 4 hour duration, happened yesterday
    const yesterday = new Date(
      new Date().setHours(13, 0, 0, 0) - 24 * 60 * 60 * 1000,
    );
    await Event.create({
      title: "Прошедший тренинг",
      description: "Тренинг по развитию навыков",
      start: yesterday,
      end: new Date(yesterday.getTime() + 1000 * 60 * 60 * 4),
      location: "г. Кемерово, ул. Весенняя 15",
      preview_path: "https://images.unsplash.com/photo-1552664730-d307ca884978",
      likes: [1, 2],
      participants: await User.findBy({ id: In([2]) }),
    }).save();

    // Event 8 - 90 minute duration, starts in 1 week at evening time
    const eveningNextWeek = new Date(
      new Date().setHours(18, 30, 0, 0) + 7 * 24 * 60 * 60 * 1000,
    );
    await Event.create({
      title: "Вечерняя лекция",
      description: "Лекция о будущем искусственного интеллекта",
      start: eveningNextWeek,
      end: new Date(eveningNextWeek.getTime() + 1000 * 60 * 90),
      location: "г. Кемерово, пр. Советский 73",
      preview_path:
        "https://images.unsplash.com/photo-1588196749597-9ff075ee6b5b",
      likes: [],
      participants: await User.findBy({ id: In([3]) }),
    }).save();

    // Event 9 - 6 hour duration, starts today evening
    const todayEvening = new Date(new Date().setHours(16, 0, 0, 0));
    await Event.create({
      title: "Ёлкин код: Кузбасский хакатон по программированию",
      description: "Соревнование для разработчиков по созданию проектов",
      start: new Date(2025, 1, 28),
      end: new Date(2025, 2, 2),
      location: "г. Кемерово, Советский пр., 62",
      preview_path:
        "https://images.unsplash.com/photo-1504384308090-c894fdcc538d",
      likes: [1],
      participants: await User.findBy({ id: In([1, 3]) }),
    }).save();

    // Event 10 - All day event (8 hours), starts in 2 weeks
    const twoWeeksLater = new Date(
      new Date().setHours(9, 0, 0, 0) + 14 * 24 * 60 * 60 * 1000,
    );
    await Event.create({
      title: "Конференция разработчиков",
      description: "Ежегодная конференция для разработчиков и IT-специалистов",
      start: twoWeeksLater,
      end: new Date(twoWeeksLater.getTime() + 1000 * 60 * 60 * 8),
      location: "г. Кемерово, пр. Октябрьский 51",
      preview_path:
        "https://images.unsplash.com/photo-1515187029135-18ee286d815b",
      likes: [2, 3],
      participants: await User.findBy({ id: In([1, 2, 3]) }),
    }).save();
  }
}

export default createTypedRoute(createSampleData);
