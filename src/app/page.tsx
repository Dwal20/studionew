import Header from '@/components/header';
import ContactForm from '@/components/contact-form';
import { projects, experiences, certifications } from '@/lib/data';
import Image from 'next/image';
import { getSkillClass, SKILL_CATEGORIES } from '@/lib/skills';

const skillCategoryOrder = {
  [SKILL_CATEGORIES.STRATEGIC]: 1,
  [SKILL_CATEGORIES.EXECUTION]: 2,
  [SKILL_CATEGORIES.DATA]: 3,
  [SKILL_CATEGORIES.DEFAULT]: 4,
};

const sortSkills = (skills: string[]) => {
  return [...skills].sort((a, b) => {
    const classA = getSkillClass(a);
    const classB = getSkillClass(b);
    const orderA = skillCategoryOrder[classA as keyof typeof skillCategoryOrder] || 99;
    const orderB = skillCategoryOrder[classB as keyof typeof skillCategoryOrder] || 99;
    if (orderA !== orderB) {
      return orderA - orderB;
    }
    return a.localeCompare(b);
  });
};


export default function Home() {
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <Header />
      <main>
        <section className="py-16 text-center" id="projects">
            <h2 className="text-3xl font-bold mb-2">Project Portfolio</h2>
            <p className="text-gray-600 max-w-3xl mx-auto">A showcase of my project experience, highlighting my skills and accomplishments for potential employers.</p>
          <div className="bg-white rounded-lg shadow-md mt-12 p-8">
            <div className="flex items-center mb-6">
              <Image alt="Google logo" className="h-8 mr-4" width="32" height="32" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDTLZFiupaS6AXsxEw3YokLWsPOVvEwIQf6ybx7MmUPmDJLZ7ZOuHceWZJNqze_0SkYqgxLdwo46wR7g3EUFsS7eDFdmlPi9ONjVWt-16xXvDe6Tjw58BHhLs05uE319fDaO0TKWFMmUjMNMBvKQwW7oN8GXS8WAUyHvQlL1eDUz380Afg9IPW8Op41iODJftx014cMULoSoitEiXgHYsYe5hfGDDDIYMPlsc9ph7f6m0w9ctRyVi_Vg3U3ggZmDSiV_hBbSUOWpo4" />
              <h3 className="text-2xl font-bold text-left">Google</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 pr-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Project Name</th>
                    <th className="py-3 px-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Time Duration</th>
                    <th className="py-3 px-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="py-3 pl-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Skills Demonstrated</th>
                  </tr>
                </thead>
                <tbody>
                  {projects.map((project, index) => (
                    <tr className={`border-b ${index === projects.length - 1 ? 'border-b-0' : ''}`} key={index}>
                      <td className="py-4 pr-4 align-top font-medium">{project.title}</td>
                      <td className="py-4 px-4 align-top text-sm text-gray-600">
                        <span className="inline-block px-3 py-1 text-xs font-medium" style={{ backgroundColor: '#E5E7EB', color: '#4B5563' }} dangerouslySetInnerHTML={{ __html: project.period }}></span>
                      </td>
                      <td className="py-4 px-4 align-top text-sm text-gray-600">
                        <ul className="list-disc list-inside space-y-1">
                          {project.description.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                      </td>
                      <td className="py-4 pl-4 align-top">
                        <div className="flex flex-wrap gap-2">
                          {sortSkills(project.skills).map((skill, i) => (
                            <span key={i} className={`skill-tag ${getSkillClass(skill)}`}>{skill}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md mt-12 p-8">
            <h3 className="text-2xl font-bold text-left mb-6">Start-up &amp; Early Experience</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 pr-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Project Name</th>
                    <th className="py-3 px-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Time Duration</th>
                    <th className="py-3 px-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Description</th>
                    <th className="py-3 pl-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Skills Demonstrated</th>
                  </tr>
                </thead>
                <tbody>
                  {experiences.map((exp, index) => (
                    <tr className={`border-b ${index === experiences.length - 1 ? 'border-b-0' : ''}`} key={index}>
                      <td className="py-4 pr-4 align-top font-medium">
                        {exp.role}<br /><span className="text-sm text-gray-500">@ {exp.company}</span>
                      </td>
                      <td className="py-4 px-4 align-top text-sm text-gray-600">
                        <span className="inline-block px-3 py-1 text-xs font-medium" style={{ backgroundColor: '#E5E7EB', color: '#4B5563' }} dangerouslySetInnerHTML={{ __html: exp.period }}></span>
                      </td>
                      <td className="py-4 px-4 align-top text-sm text-gray-600">
                        <ul className="list-disc list-inside space-y-1">
                          {exp.description.map((desc, i) => <li key={i}>{desc}</li>)}
                        </ul>
                      </td>
                      <td className="py-4 pl-4 align-top">
                        <div className="flex flex-wrap gap-2">
                          {sortSkills(exp.skills).map((skill, i) => (
                             <span key={i} className={`skill-tag ${getSkillClass(skill)}`}>{skill}</span>
                          ))}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
        <section className="py-16" id="skills">
            <h2 className="text-3xl font-bold mb-8 text-center">Technical Skills &amp; Certifications</h2>
            <div className="bg-white rounded-lg shadow-md p-8">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b">
                                <th className="py-3 pr-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Course/Certification</th>
                                <th className="py-3 px-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="py-3 pl-4 font-semibold text-xs text-gray-500 uppercase tracking-wider">Core Competencies &amp; Skills Gained</th>
                            </tr>
                        </thead>
                        <tbody>
                            {certifications.map((cert, index) => (
                                <tr className={`border-b ${index === certifications.length - 1 ? 'border-b-0' : ''}`} key={index}>
                                    <td className="py-4 pr-4 align-top font-medium">{cert.title}</td>
                                    <td className="py-4 px-4 align-top text-sm text-gray-600">
                                      <ul className="list-disc list-inside space-y-1">
                                          {cert.description.map((desc, i) => <li key={i}>{desc}</li>)}
                                      </ul>
                                    </td>
                                    <td className="py-4 pl-4 align-top">
                                        <div className="flex flex-wrap gap-2">
                                            {sortSkills(cert.skills).map((skill, i) => (
                                                <span key={i} className={`skill-tag ${getSkillClass(skill)}`}>{skill}</span>
                                            ))}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
        <section className="py-16 text-center" id="about">
          <div className="bg-white rounded-lg shadow-md p-12 max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">A bit about myself.</h2>
            <p className="text-gray-600 leading-relaxed">I am a driven project management professional, passionate about building impactful programs. My journey started in the fast-paced US startup scene, where I developed a keen sense of agility and resourcefulness. Now, as a Project Management Apprentice at Google, I am honing my skills in structured, cross-functional execution on a global scale. I am focused on leveraging this unique blend of experience to solve complex challenges and grow into a successful career.</p>
          </div>
        </section>
        <section className="py-16" id="contact">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Get in Touch</h2>
            <p className="text-gray-600 mt-2 mb-8">I'm always open to discussing new projects, creative ideas, or opportunities to be part of an amazing team.</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-8 max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </section>
      </main>
    </div>
  );
}
