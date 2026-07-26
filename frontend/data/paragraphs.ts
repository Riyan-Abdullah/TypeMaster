export const PARAGRAPHS: string[] = [
  "Software engineering is the systematic application of engineering approaches to the development of software. It involves analyzing user needs and then designing, building, and testing end-user applications that satisfy those needs through the use of software programming languages.",
  "The quick brown fox jumps over the lazy dog. This classic pangram contains every letter of the English alphabet at least once. It has been used for over a century to test keyboards, typewriters, and digital fonts for legibility and accuracy.",
  "Artificial intelligence is transforming industries around the world by automating complex tasks and enabling computers to learn from massive amounts of data. Machine learning algorithms can recognize patterns and make decisions with minimal human intervention.",
  "Web development has evolved rapidly over the past decade. Modern web applications leverage component-based frameworks, serverless APIs, and responsive design systems to deliver smooth, application-like user experiences directly in the browser.",
  "Clean code always looks like it was written by someone who cares. There is no single magic shortcut to writing clean code; it requires discipline, thoughtful architecture, consistent naming conventions, and continuous refactoring.",
  "TypeScript brings static typing to JavaScript, helping developers catch errors at compile time rather than runtime. By defining explicit interfaces and types, teams can write more predictable, maintainable, and self-documenting codebases.",
  "Cloud computing allows individuals and organizations to access computing resources, such as servers, storage, and databases, on demand over the internet without having to build and maintain physical data centers.",
  "The history of computing spans thousands of years, starting with simple counting devices like the abacus. Today, modern microprocessors contain billions of transistors operating at lightning speeds inside pocket-sized smartphones.",
  "Typography is the art and technique of arranging type to make written language legible, readable, and visually appealing when displayed. Good typography improves user engagement and enhances overall aesthetic appeal.",
  "Consistency is the key to mastering any skill, including touch typing. Practicing for just fifteen minutes every day builds muscle memory and gradually increases your words per minute while minimizing keystroke errors.",
  "Open source software powers much of the modern internet. Developers around the globe collaborate asynchronously to build frameworks, libraries, and operating systems that are freely accessible to everyone.",
  "Database management systems organize structured data efficiently, allowing applications to store, retrieve, and update information with high performance, ACID compliance, and strong reliability guarantees.",
  "Designing intuitive user interfaces requires a deep understanding of user psychology, accessibility standards, and visual hierarchy. Every button, padding offset, and font choice contributes to the overall user experience.",
  "Cybersecurity is essential in protecting digital infrastructure against unauthorized access, data breaches, and malicious attacks. Encryption, multi-factor authentication, and regular audits are foundational security practices.",
  "Algorithms are step-by-step instructions designed to perform specific calculations or solve complex computational problems. Optimizing algorithm efficiency can drastically reduce execution time and resource consumption.",
  "The internet connects billions of devices globally using standard networking protocols like TCP/IP and HTTP. Data packets travel across fiber optic lines beneath oceans at nearly the speed of light.",
  "Version control systems like Git allow software teams to track code changes, collaborate seamlessly across branches, and revert to prior working states whenever issues arise during product development.",
  "Responsive web design ensures that websites look and function seamlessly across a wide variety of devices, from ultra-wide desktop monitors to compact mobile screens with touch input.",
  "Productivity is not about doing more things; it is about doing the right things effectively. Focusing on high-impact tasks and eliminating unnecessary distractions leads to higher quality output.",
  "Continuous integration and continuous deployment pipelines automate code building, testing, and deployment, enabling engineering teams to ship updates safely and frequently with high confidence.",
  "Learning to type without looking at the keyboard allows your mind to focus entirely on ideas rather than hunting for keys. Smooth finger placement on the home row is the foundation of speed.",
  "Rest API design emphasizes stateless communication between client and server applications using standard HTTP methods like GET, POST, PUT, and DELETE to manage resources predictably.",
  "Functional programming emphasizes immutability, pure functions, and declarative code structures. It minimizes side effects, making applications easier to test and reason about in complex systems.",
  "Microservices architecture breaks down monolithic applications into smaller, independently deployable services that communicate via lightweight protocols, improving scalability and deployment speed.",
  "Data structures like arrays, hash maps, linked lists, and trees form the building blocks of efficient software development. Choosing the right data structure directly impacts program performance.",
  "User authentication verifies the identity of individuals attempting to access an application, ensuring that sensitive data and protected resources remain accessible only to authorized users.",
  "Cascading Style Sheets control the visual presentation of web pages. Modern CSS features like Flexbox, Grid, and custom properties allow developers to craft sophisticated responsive layouts with ease.",
  "Asynchronous programming enables applications to handle multiple operations concurrently without blocking the main execution thread, delivering responsive interfaces during network requests.",
  "Agile software development encourages iterative progress, flexible planning, and early delivery of functional software. Cross-functional teams adapt quickly to changing user requirements.",
  "DevOps bridges the gap between software development and IT operations, fostering a culture of shared responsibility, automated testing, continuous monitoring, and rapid deployment cycles.",
  "Performance optimization involves profiling code, reducing bundle sizes, caching static assets, and minimizing network latency to deliver fast loading times and smooth 60fps animations.",
  "The command line interface gives developers direct, scriptable control over operating system utilities, build tools, and server configurations with high speed and precision.",
  "Building accessible web applications ensures that people with disabilities can navigate, perceive, and interact with digital products effectively using assistive technologies like screen readers.",
  "Object-oriented programming organizes code into reusable objects that combine data and behavior, utilizing principles such as encapsulation, inheritance, and polymorphism.",
  "Writing tests guarantees that existing functionality continues to work as expected when new features are added. Unit, integration, and end-to-end tests form a reliable safety net."
];

export function getRandomParagraph(excludeId?: string): string {
  if (PARAGRAPHS.length === 0) return "Default typing paragraph.";
  let selected = PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
  if (PARAGRAPHS.length > 1 && selected === excludeId) {
    // Retry once to avoid consecutive duplicate
    selected = PARAGRAPHS[Math.floor(Math.random() * PARAGRAPHS.length)];
  }
  return selected;
}
