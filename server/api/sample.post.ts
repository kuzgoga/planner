import { H3Event, EventHandlerRequest, use } from "h3";
import { User } from "~/server/entities/user.entity";
import { Event } from "~/server/entities/event.entity";
import { In } from "typeorm";

async function createSampleData(events: H3Event): Promise<void> {
  await addUsers();
  await addEvents();
}

async function addUsers() {
  if ((await User.count()) < 4) {
    await User.create({
      email: "kuzgoga@goga.ru",
      password_hash: "12345678",
      firstName: "Куз",
      lastName: "Гога",
      role: Role.PARTICIPANT,
    }).save();

    await User.create({
      email: "undersky@goga.ru",
      password_hash: "12345678",
      firstName: "Поднебесный",
      lastName: "Алексей",
      role: Role.PARTICIPANT,
    }).save();

    await User.create({
      email: "gofman@goga.ru",
      password_hash: "12345678",
      firstName: "Игорь",
      lastName: "Гофман",
      role: Role.ORGANIZER,
    }).save();

    await User.create({
      email: "umk@gkl-kemerovo.ru",
      password_hash: "password3",
      firstName: "Герман",
      lastName: "Нефтебаза",
      role: Role.ADMIN,
    }).save();
  }
}

async function addEvents() {
  if ((await Event.count()) < 4) {
    await Event.create({
      title: "Конференция",
      description: "Описание конференции",
      start: new Date(),
      end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      location: "Кемерово",
      preview_path:
        "https://ir-5.ozone.ru/s3/multimedia-t/wc1000/6832978517.jpg",
      likes: [],
      participants: await User.findBy({ id: In([1]) }),
    }).save();

    await Event.create({
      title: "Семинар",
      description: "Описание семинара",
      start: new Date(),
      end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      location: "г.Кемерово, ул Красная 5А",
      preview_path:
        "https://ir-5.ozone.ru/s3/multimedia-t/wc1000/6832978517.jpg",
      likes: [],
      participants: await User.findBy({ id: In([2]) }),
    }).save();

    await Event.create({
      title: "Вебинар",
      description: "Описание вебинара",
      start: new Date(),
      end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      location: "г. Кемерово, жилой район Кедровка, ул. Ленина 1А",
      preview_path:
        "https://ir-5.ozone.ru/s3/multimedia-t/wc1000/6832978517.jpg",
      likes: [],
      participants: await User.findBy({ id: In([1]) }),
    }).save();

    await Event.create({
      title: "Мастер-класс",
      description: "Описание мастер-класса",
      start: new Date(),
      end: new Date(new Date().getTime() + 1000 * 60 * 60 * 24),
      location: "г. Кемерово, ул. Спартака 1А",
      preview_path:
        "https://ir-5.ozone.ru/s3/multimedia-t/wc1000/6832978517.jpg",
      likes: [],
      participants: await User.findBy({ id: In([1, 2]) }),
    }).save();
  }
}

export default createTypedRoute(createSampleData);
