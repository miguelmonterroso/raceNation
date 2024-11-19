import BlurFade from "@/components/ui/blur-fade"
import LayoutAuth from "@/layout/auth/layoutAuth"

export default function auht(){
    return(
        <BlurFade delay={0.5} inView>            
        <div>
            <LayoutAuth/>  
        </div>
        </BlurFade>

    );
}