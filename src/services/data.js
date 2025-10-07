import axios from "axios";


export default class DataService {

    static ME = "Arda Cetinkaya | Software Engineer @Stockholm, Sweden";
    static MY_NAME = "Arda Cetinkaya";
    static MY_PHOTO = "assets/images/profile/me_02.jpeg";
    static MY_LOCATION = "Stockholm, Sweden";
    static MY_OCCUPATION = "Software Engineer";
    static MY_BLOG = "https://www.minepla.net";
    static MY_LINKEDIN_PAGE = "https://www.linkedin.com/in/ardacetinkaya/";

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
                    name:"Qliro",
                    logo:"assets/images/companies/qliro.png",
                    location:"Stockholm, Sweden",
                    url:"https://www.qliro.se",
                    title:"Senior Software Engineer",
                    description:"- Responsible for implementation and design of a new unified payment solution for merchants who are willing to be in e-commerence market with different payment methods" 
                    + "<br />- Event-driven, scalable, resilent workloads implementation with latest .NET Platforms technology stack."
                    + "<br />- Cloud-driven solution implementation and management on AWS with wide-range of resources like; Lambda, QLDB,"
                    + " ECS, Cloudwatch, DynamoDB, VPC, SNS, SQS, S3, Batch, with Terraform"
                    + "<br />- Also involved on company wide business and techical initiatives"
                },
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
            return `<strong className="h5">Hej</strong>,
             I’m Arda… I am a software developer; I solve complicated problems in a way that computers can understand so then they provide solutions to <strong>empower people</strong>. Also I help developers to <strong>do their best</strong>. 
            
I do analyze, think about the suitable architecture and then implement the necessary approaches. And of course, I do <strong>write “code”</strong>. As I have <strong>passion learning new things</strong>, I always have fun to keep my self up to date.  I have been doing these things for 18 years with a great passion. I did the right and best mistakes… I merge lessons from these mistakes with my experience to provide best solutions. 

So far, <strong>distributed systems, service oriented applications</strong> and enterprise level applications are the main solutions which I am involved in. I try to <strong>contribute all stages of development life-cycle</strong> to create valued and quality solutions. <strong>Software development principles, architectural patterns and agile methodologies</strong> are main topics which I focus in my solutions. I do question deeply on these topics to find most suitable implementation.

<strong>Cloud platforms(Azure, AWS)</strong> are the main parts of the solutions that I worked lately. And also <strong>cloud native platforms and technologies</strong> are in my toolbox. I have been providing suitable and required features within cloud native solutions.

Mostly I work with Microsoft technology stack; <strong>.NET Platform, Azure...etc.</strong> But as an engineer, I try to involve in every technology which I can create a solution. For desired quality criteria, I always think about alternatives.
`;
        } else if(what ==="education"){
            return `<strong className="h5">Education</strong> - Çankaya Üniversitesi, Turkey - BS, Computer Engineering @ 2002 - 2006`;
        } else if(what ==="other"){
            return `<strong className="h5">Other</strong> - Beside these “geek” topics, I like to travel and to explore new places. I like getting to know new people and share experiences. <strong>Listening music ( \\m/ )</strong> takes up a big space in my life. Because of the inner child, I still like doing new things with <strong>“LEGO”</strong>. And sailing is a fun breeze in my life. Maybe I am not a good sport player, but I like playing <strong>basketball</strong>. and following <strong>basketball events</strong>.
            
            I also write blog posts to share my experiences. Have a look at <strong><a href="https://www.minepla.net" target="_blank">https://www.minepla.net</a></strong>`;
        } else if(what ==="work"){
            return `<strong className="h5">Currently</strong> - Since October 2022, working at <strong><a href="https://www.qliro.com/" target="_blank"><img src="assets/images/companies/qliro.png" class="brand-img" width="15%" alt="Qliro"></a></strong> as a consultant from <strong><a href="https://swedq.se" target="_blank" alt="SwedQ"><img src="assets/images/companies/swedq.png" class="brand-img" width="12%" ></a></strong>.`;
        }

        return ``;
    }

    getSkils = async()=>{
        return [
            {
                category: "Programming Languages & Frameworks",
                skills: [
                    { name: "C#", level: 96 },
                    { name: ".NET Platform", level: 90 },
                    { name: "ASP.NET Core (MVC, Web API, Razor, Blazor)", level: 94 },
                    { name: "JavaScript", level: 80 },
                    { name: "React", level: 69 },
                    { name: "Node.js", level: 75 },
                    { name: "Python", level: 25 },
                    { name: "WPF", level: 55 },
                    { name: "UI (HTML, CSS, Bootstrap)", level: 69 }

                ]
            },
            {
                category: "Cloud",
                skills: [
                    { name: "Azure", level: 94 },
                    { name: "AWS", level: 80 },
                    { name: "Docker", level: 85 },
                    { name: "Cloud Native Platforms (Kubernetes, OpenShift)", level: 78 },
                    { name: "Infrastructure as Code (Terraform)", level: 87 },
                    { name: "Powershell/Bash", level: 69 }
                ]
            },
            {
                category: "Architecture & Development Practices",
                skills: [
                    { name: "Software Development Principles", level: 94 },
                    { name: "Distributed Systems (SOA, Microservices, Messaging/Event Systems)", level: 85 },
                    { name: "Agile Methodologies (SCRUM, Kanban)", level: 80 },
                    { name: "Domain-Driven Design", level: 87 },
                    { name: "Object-oriented programming (SOLID Principles)", level: 96 },
                    { name: "Test-Driven Development(TDD, Unit Tests, SpecFlow)", level: 77 },
                    { name: "Inter-service communication (REST, gRPC, WebSockets)", level: 90 }
                ]
            },
            {
                category: "Databases & Storage",
                skills: [
                    { name: "MS SQL", level: 90 },
                    { name: "PostgreSQL", level: 50 },
                    { name: "NoSQL (MongoDB, CosmosDB)", level: 80 },
                    { name: "Caching (Redis)", level: 70 },
                    { name: "Data Migration & ETL", level: 40 }
                ]
            },
            {
                category: "CI/CD",
                skills: [
                    { name: "Version Control (Git, GitHub, GitLab)", level: 87 },
                    { name: "Azure DevOps", level: 90 },
                    { name: "ArgoCD", level: 80 },
                    { name: "Tekton", level: 77 },
                    { name: "GitHub Actions", level: 84 },
                ]
            },
            {
                category: "Monitoring & Observability",
                skills: [
                    { name: "OpenTelemetry", level: 90 },
                    { name: "Grafana", level: 86 },
                    { name: "Elasticsearch", level: 75 },
                    { name: "Prometheus", level: 80 },
                ]
            },
            {
                category: "Frontend & Other Technologies",
                skills: [
                    
                    { name: "Mobile (React Native)", level: 45 },
                    { name: "Microsoft Power Platform (Power BI, Power Apps)", level: 50 }
                ]
            }
        ]
    }
}

