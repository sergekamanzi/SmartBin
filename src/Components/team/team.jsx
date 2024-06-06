const people = [
  {
    name: "Samuel Dushime",
    role: "Back-end Developer",
    imageUrl: "./src/assets/IMG_2768.JPG",
  },
  {
    name: "Serge Kamanzi",
    role: "Database Developer",
    imageUrl: "",
  },
  {
    name: "Betty Mukankunsi",
    role: "Front-end Developer",
    imageUrl: "",
  },
  {
    name: "Jules Gatete",
    role: "Deployment and DevOps Engineer",
    imageUrl: "",
  },
  {
    name: "Diane Ingabire",
    role: "Quality assurance",
    imageUrl: "",
  },
];

export default function Team() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-20 grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet our Team
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Together, our diverse and skilled team is dedicated to delivering a
            high-quality and user-friendly smart waste management
            solution.
          </p>
        </div>
        <ul
          role="list"
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2"
        >
          {people.map((person) => (
            <li key={person.name}>
              <div className="flex items-center gap-x-6">
                <img
                  className="h-16 w-16 rounded-full"
                  src={person.imageUrl}
                  alt=""
                />
                <div>
                  <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-[#37af65]">
                    {person.role}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
