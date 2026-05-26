import {
  ArrowRight,
  Code2,
  MessageCircle,
  Users,
  Sparkles,
} from "lucide-react";

import { Button } from "@/components/ui/button";

import { Card, CardContent } from "@/components/ui/card";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import AuthDialog from "./Auth";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);
  useEffect(() => {
    if (user && location.pathname === "/") {
      navigate("/feed");
    }
  }, [user]);
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* HERO SECTION */}

      <section className="relative">
        {/* BACKGROUND BLUR */}

        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-primary/20 blur-3xl rounded-full" />

          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 blur-3xl rounded-full" />
        </div>

        {/* HERO CONTENT */}

        <div className="max-w-6xl mx-auto px-6 py-10 lg:py-5 grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}

          <div>
            <div className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm bg-background/70 backdrop-blur mb-6">
              <Sparkles className="w-4 h-4 text-primary" />

              <span>Developer Networking Reimagined</span>
            </div>

            <h1 className="text-5xl sm:text-6xl font-bold tracking-tight leading-tight">
              Meet, Connect & Build with
              <span className="text-primary block mt-2">
                Developers Worldwide
              </span>
            </h1>

            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              DevPairr helps developers connect, collaborate, chat and grow
              together. Discover amazing people based on skills, interests and
              tech stack.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <AuthDialog />
              {/* <Button size="lg" className="rounded-full text-base">
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button> */}

              <Button
                variant="outline"
                size="lg"
                className="rounded-full text-base"
              >
                Explore Developers
              </Button>
            </div>

            {/* SOCIAL PROOF */}

            <div className="flex items-center gap-6 mt-10">
              <div className="flex -space-x-3">
                <Avatar className="border-2 border-background">
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>

                <Avatar className="border-2 border-background">
                  <AvatarImage src="https://github.com/vercel.png" />
                </Avatar>

                <Avatar className="border-2 border-background">
                  <AvatarImage src="https://github.com/leerob.png" />
                </Avatar>
              </div>

              <div>
                <p className="font-semibold">10,000+ developers</p>

                <p className="text-sm text-muted-foreground">
                  already networking on DevPairr
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT */}

          <div className="relative">
            {/* MAIN CARD */}

            <Card className="rounded-3xl border bg-background/80 backdrop-blur shadow-2xl overflow-hidden">
              <CardContent className="p-0">
                {/* TOP BAR */}

                <div className="flex items-center gap-2 px-5 py-4 border-b">
                  <div className="w-3 h-3 rounded-full bg-red-500" />

                  <div className="w-3 h-3 rounded-full bg-yellow-500" />

                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>

                {/* PROFILE */}

                <div className="p-8">
                  <div className="flex items-center gap-5">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src="https://github.com/shadcn.png" />
                    </Avatar>

                    <div>
                      <h2 className="text-2xl font-bold">Sumit Kumar</h2>

                      <p className="text-muted-foreground">
                        MERN Stack Developer
                      </p>

                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-3 py-1 rounded-full bg-secondary text-xs">
                          React
                        </span>

                        <span className="px-3 py-1 rounded-full bg-secondary text-xs">
                          Node.js
                        </span>

                        <span className="px-3 py-1 rounded-full bg-secondary text-xs">
                          MongoDB
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* ACTIONS */}

                  <div className="grid grid-cols-2 gap-4 mt-8">
                    <Button variant="outline" className="rounded-xl">
                      Ignore
                    </Button>

                    <Button className="rounded-xl">Connect</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* FLOATING CARDS */}

            <Card className="hidden md:block absolute -left-16 top-10 w-52 rounded-2xl shadow-xl">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-primary" />
                </div>

                <div>
                  <p className="font-medium text-sm">Real-time Chat</p>

                  <p className="text-xs text-muted-foreground">
                    Instant developer messaging
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="hidden md:block absolute -right-12 bottom-0 w-56 rounded-2xl shadow-xl">
              <CardContent className="p-4 flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-purple-500" />
                </div>

                <div>
                  <p className="font-medium text-sm">Smart Matching</p>

                  <p className="text-xs text-muted-foreground">
                    Based on skills & interests
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FEATURES */}

      <section id="features" className="max-w-7xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-4xl font-bold">Everything developers need</h2>

          <p className="text-muted-foreground mt-4 text-lg">
            Modern tools to network, collaborate and grow together.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <Card className="rounded-3xl">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Code2 className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-semibold">Skill Based Matching</h3>

              <p className="text-muted-foreground mt-3">
                Connect with developers who share your tech stack and interests.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <MessageCircle className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-semibold">Real-time Messaging</h3>

              <p className="text-muted-foreground mt-3">
                Chat instantly and collaborate on exciting projects together.
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-3xl">
            <CardContent className="p-8">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-primary" />
              </div>

              <h3 className="text-xl font-semibold">Developer Community</h3>

              <p className="text-muted-foreground mt-3">
                Build meaningful connections with developers worldwide.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* FOOTER */}

      {/* <footer id="footer" className="border-t">
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h2 className="font-bold text-xl">DevTinder</h2>

            <p className="text-sm text-muted-foreground mt-1">
              Made for developers ❤️
            </p>
          </div>

          <div className="flex items-center gap-5">
            <a className="text-muted-foreground hover:text-foreground transition">
              <Github className="w-5 h-5" />
            </a>

            <a className="text-muted-foreground hover:text-foreground transition">
              <Twitter className="w-5 h-5" />
            </a>

            <a className="text-muted-foreground hover:text-foreground transition">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </footer> */}
    </div>
  );
}
