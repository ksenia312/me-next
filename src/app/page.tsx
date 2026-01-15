import {Header} from "@/components/layout/header/Header";
import {WelcomeSection} from "@/features/welcome/WelcomeSection";
import {SummarySection} from "@/features/summary/SummarySection";
import {ExperienceSection} from "@/features/experience/ExperienceSection";
import {ProjectsSection} from "@/features/projects/ProjectsSection";
import {Footer} from "@/components/layout/footer/Footer";


export default function Page() {
    return (
        <main>
            <Header/>
            <WelcomeSection/>
            <SummarySection/>
            <ExperienceSection/>
            <ProjectsSection/>
            <Footer/>
        </main>
    );
}