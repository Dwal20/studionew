import { Github, Linkedin, Mail } from 'lucide-react';
import { projects, experiences, skills, certifications } from '@/lib/data';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/header';
import Footer from '@/components/footer';
import ContactForm from '@/components/contact-form';

const TimelineItem = ({ period, company, role, description, skills }: { period: string, company: string, role: string, description: string[], skills: string[] }) => (
  <div className="grid md:grid-cols-[1fr_2fr_3fr] gap-x-8 gap-y-2 relative pl-8 py-4">
    <div className="timeline-decorator"></div>
    <div className="text-muted-foreground">{period}</div>
    <div>
      <h3 className="font-semibold">{company}</h3>
      <p className="text-muted-foreground">{role}</p>
    </div>
    <div>
      <ul className="list-disc pl-4 text-muted-foreground space-y-1">
        {description.map((item, index) => <li key={index}>{item}</li>)}
      </ul>
      <div className="flex flex-wrap gap-2 mt-4">
        {skills.map((skill) => (
          <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-800">{skill}</Badge>
        ))}
        {skills.map((skill) => (
          <Badge key={skill + '2'} variant="secondary" className="bg-green-100 text-green-800">{skill}</Badge>
        ))}
      </div>
    </div>
  </div>
);


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Header />
      <main className="mt-16">
        <section id="portfolio" className="mb-24">
          <h1 className="text-4xl font-bold text-center mb-2">Project Portfolio</h1>
          <p className="text-center text-muted-foreground mb-12">A STATEMENT OF MY CAPACITY TO BUILD BEAUTIFUL, INTUITIVE WEB EXPERIENCES FROM THE GROUND UP.</p>

          <Card className="mb-8">
            <CardHeader className="flex flex-row items-center gap-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8"><path d="M15 12.33a2.33 2.33 0 0 1-1.23 2.05c-1.39.71-3.23.44-4.34-1.07-1.12-1.52-.83-3.66.69-4.77.92-.66 2.1-.81 3.14-.4"/>
              <path d="M12 22a10 10 0 0 0 10-10H2a10 10 0 0 0 10 10Z"/><path d="m20.66 12-2 .8-1.4-3.5 1.4-3.5 2 .8a10 10 0 0 1 0 5.4Z"/><path d="M3.34 12l2 .8 1.4-3.5L5.34 5.8l-2 .8a10 10 0 0 0 0 5.4Z"/></svg>
              <h2 className="text-2xl font-semibold">Google</h2>
            </CardHeader>
            <CardContent>
              {projects.map((project, index) => (
                <div key={index} className="grid md:grid-cols-[1fr_2fr_3fr] gap-x-8 gap-y-2 py-4 border-t">
                  <div className="text-muted-foreground">{project.period}</div>
                  <div>
                    <h3 className="font-semibold">{project.title}</h3>
                    <p className="text-muted-foreground">{project.subtitle}</p>
                  </div>
                  <div>
                     <ul className="list-disc pl-4 text-muted-foreground space-y-1">
                      {project.description.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                    <div className="flex flex-wrap gap-2 mt-4">
                      {project.skills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-800">{skill}</Badge>
                      ))}
                       {project.tools.map((tool) => (
                        <Badge key={tool} variant="secondary" className="bg-green-100 text-green-800">{tool}</Badge>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="experience" className="mb-24">
          <h2 className="text-3xl font-bold mb-8">Start-up & Early Experience</h2>
           <Card>
            <CardContent className="pt-6">
              {experiences.map((exp, index) => (
                <TimelineItem key={index} {...exp} />
              ))}
            </CardContent>
          </Card>
        </section>

        <section id="skills" className="mb-24">
          <h2 className="text-3xl font-bold mb-8">Technical Skills & Certifications</h2>
          <Card>
            <CardContent className="pt-6">
               <div className="grid md:grid-cols-[1fr_3fr] gap-x-8 gap-y-2 py-4 border-b">
                <h3 className="font-semibold text-lg">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="bg-purple-100 text-purple-800">{skill}</Badge>
                  ))}
                  {skills.map((skill) => (
                    <Badge key={skill + '2'} variant="secondary" className="bg-green-100 text-green-800">{skill}</Badge>
                  ))}
                </div>
              </div>
              <div className="grid md:grid-cols-[1fr_3fr] gap-x-8 gap-y-2 py-4">
                <h3 className="font-semibold text-lg">Certifications</h3>
                <div className="flex flex-wrap gap-2">
                  {certifications.map((cert) => (
                     <Badge key={cert} variant="secondary" className="bg-purple-100 text-purple-800">{cert}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        <section id="about" className="mb-24">
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-center mb-4">A bit about myself.</h2>
            <p className="text-center text-muted-foreground max-w-2xl mx-auto">
              I am a software engineer with a passion for building beautiful and intuitive web experiences. I have experience working with a variety of technologies and I am always looking for new challenges to grow my skills. When I'm not coding, I enjoy hiking, reading, and exploring new coffee shops. I am currently seeking new opportunities where I can make a meaningful impact.
            </p>
          </Card>
        </section>

        <section id="contact">
          <h2 className="text-3xl font-bold text-center mb-2">Get in Touch</h2>
          <p className="text-center text-muted-foreground mb-8">I'm currently looking for new opportunities. I'm always open to a chat, so please get in touch.</p>
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8">
              <ContactForm />
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
