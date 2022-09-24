import axios from "axios";


export default class DataService {

    getBlogPosts = async (rssURL) => {
        var posts = [];
        if (rssURL) {
            posts = axios.get(`https://api.rss2json.com/v1/api.json?rss_url=${rssURL}`)
                .then(res => {
                    var posts = res.data.items;
                    return posts;
                });
        }
        return posts;
    }

    getSocial = async () => {
        return [
            {
                value:"https://www.minepla.net",
                icon:"uil uil-notes"
            },
            {
                value:"https://twitter.com/ardacetinkaya",
                icon:"uil uil-twitter"
            },
            {
                value:"https://www.linkedin.com/in/ardacetinkaya/",
                icon:"uil uil-linkedin"
            },
            {
                value:"https://github.com/ardacetinkaya",
                icon:"uil uil-github"
            },
            {
                value:"https://www.last.fm/user/MaskedFace",
                icon:"uil uil-music"
            }
        ]
    }

    getAbout = async (what) => {
        if(what=== "experience")
        {
            return [
                {
                    name:"VeriPark",
                    logo:"assets/images/companies/veripark.svg",
                    location:"Istanbul, Turkey",
                    url:"https://www.veripark.com",
                    title:"Cloud Solution Architect",
                    description:"- Secure, cost-efficient and reliable cloud designs on Microsoft Azure for business critical financial solutions." 
                    + "<br />- Implementations of Azure resources for solutions’ infrastructure with Terraform and PowerShell."
                    + "<br />- End-to-end transformations of solutions to cloud native technologies such as Kubernetes, Red Hat OpenShift"
                    + " within microservices architectural style with latest .NET Platform technology stack."
                },
                {
                    name:"Fineksus",
                    logo:"assets/images/companies/fineksus.png",
                    location:"Istanbul, Turkey",
                    url:"https://www.fineksus.com",
                    title:"Software Architect, R&D and Development Team Supervisor",
                    description: "- Responsible for designing and implementing an application framework for the financial application product suit which includes applications for management, monitoring and reporting SWIFT transactions, AML and fraud prevention."
                    + "<br />- Responsible for software development team and processes to enhance efficiency."
                    + "<br />- Responsible for researching new development stacks and do proof of concepts to find the best for product suit."
                    + "<br />- Integration methodology decisions and implementations with enterprise clients."
                },
                {
                    name:"Garanti BBVA",
                    logo:"assets/images/companies/garantibbva.svg",
                    location:"Istanbul, Turkey",
                    url:"https://www.garantibbvateknoloji.com.tr",
                    title:"Senior Software Development Specialist",
                    description: "- Responsible for architectural design and implementation of a service and process management system which has a huge domain context for lots of internal and external stakeholders."
                    + "<br />- Implementation is done with distributed system manner with service-oriented architecture principles."
                },
                {
                    name:"Doğuş Teknoloji",
                    logo:"assets/images/companies/dteknoloji.png",
                    location:"Istanbul, Turkey",
                    url:"https://www.d-teknoloji.com.tr/",
                    title:"Software Development Manager",
                    description: "- Responsible to manage delivery of business requirements of an business critical ERP system."
                    + "<br />- Increased the coordination with other teams and facilitate the development team."
                    + "<br />- Ensured to follow Agile principles and agile methodologies within Scrum Master role"
                    + "<br />- Led the technical decisions, helped to solve technical problems."
                }
            ]
        } else if (what ==="me") {
            return `<strong class="h5">Hej</strong>,
             I’m Arda… I am a software developer; I solve complicated problems in a way that computers can understand so then they provide solutions to <strong>empower people</strong>. Also I help developers to <strong>do their best</strong>. 
            
I do analyze, think about the suitable architecture and then implement the necessary approaches. And of course, I do <strong>write “code”</strong>. As I have <strong>passion learning new things</strong>, I always have fun to keep my self up to date.  I have been doing these things for +15 years with a great passion. I did the right and best mistakes… I merge lessons from these mistakes with my experience to provide best solutions. 

So far, <strong>distributed systems, service oriented applications</strong> and enterprise level applications are the main solutions which I am involved in. I try to <strong>contribute all stages of development life-cycle</strong> to create valued and quality solutions. <strong>Software development principles, architectural patterns and agile methodologies</strong> are main topics which I focus in my solutions. I do question deeply on these topics to find most suitable implementation.

<strong>Cloud platforms(Azure)</strong> are the main parts of the solutions that I worked lately. And also <strong>cloud native platforms and technologies</strong> are in my toolbox. I have been providing suitable and required features within cloud native solutions.

Mostly I work with Microsoft technology stack; <strong>.NET Platform, Azure...etc.</strong> But as an engineer, I try to involve in every technology which I can create a solution. For desired quality criteria, I always think about alternatives.
            `;
        } else if(what ==="education"){
            return `<strong class="h5">Education</strong> - Çankaya Üniversitesi, Turkey - BS, Computer Engineering @ 2002 - 2006`;
        } else if(what ==="other"){
            return `<strong class="h5">Other</strong> - Beside these “geek” topics, I like to travel and to explore new places. I like getting to know new people and share experiences. <strong>Listening music ( \\m/ )</strong> takes up a big space in my life. Because of the inner child, I still like doing new things with <strong>“LEGO”</strong>. And sailing is a fun breeze in my life. Maybe I am not a good sport player, but I like playing <strong>basketball</strong>. and following <strong>basketball events</strong>.`
        }

        return ``;
    }

    getSkilss = async()=>{
        return [
            {
                name:"C#",
                level:96
            },
            {
                name:".NET Platform",
                level:90
            },
            {
                name:"Javascript",
                level:80
            },

            {
                name:"ASP.NET Core (MVC, Web API, Razor, Blazor)",
                level:94
            },
            {
                name:"Python",
                level:25
            },
            {
                name:"Software Development Principles",
                level:89
            },
            {
                name:"Agile Methodologies (SCRUM, Kanban)",
                level:80
            },
            {
                name:"Azure Cloud Platform",
                level:85
            },
            {
                name:"DevOps Principles(CI/CD w/Azure)",
                level:94
            },
            {
                name:"Jaeger",
                level:86
            },
            {
                name:"Distributed Systems (SOA, microservices, Messaging Systems)",
                level:85
            },
            {
                name:"T-SQL",
                level:80
            },
            {
                name:"node.js",
                level:55
            },
            {
                name:"Cache Management(Redis)",
                level:50
            },
            {
                name:"No-SQL (MongoDB, CosmosDB)",
                level:70
            },
            {
                name:"Docker",
                level:76
            },
            {
                name:"Cloud Native Platforms (Kubernetes, OpenShift)",
                level:60
            },
            {
                name:"UI (HTML, CSS, Bootstrap)",
                level:69
            },
            {
                name:"Mobile (React Native)",
                level:45
            },
            {
                name:"Infrastructure as Code (Terraform)",
                level:85
            },
            {
                name:"Microsoft Power Platform (Power BI, Power Apps)",
                level:50
            },
            {
                name:"Git",
                level:70
            },
            {
                name:"Messaging systems (RabbitMQ)",
                level:65
            },
            {
                name:"Object-oriented programming (SOLID Principles)",
                level:96
            },
            {
                name:"Powershell/Bash",
                level:69
            },
            {
                name:"Prometheus",
                level:80
            },
            {
                name:"OpenTelemetry",
                level:90
            },
            {
                name:"ElasticSearch",
                level:70
            }
        ]
    }
}

