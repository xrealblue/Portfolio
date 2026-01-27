import React from 'react'
import { projectData, Project } from '@/data/Projcets'
import Link from 'next/link';
import Image from 'next/image';



const Projects = () => {
  // Split the data into columns for better visual balance
  const splitIntoColumns = (data: Project[], columnsCount = 3) => {
    const result = Array.from({ length: columnsCount }, () => [] as Project[]);

    // Distribute items evenly across columns
    data.forEach((item, index) => {
      const columnIndex = index % columnsCount;
      result[columnIndex].push(item);
    });

    return result;
  };

  // Split projects into 3 columns on desktop, 2 on tablet, 1 on mobile
  const columns = splitIntoColumns(projectData as Project[], 3);

  return (
    <div className="w-full page-work"
      style={{
        padding: "clamp(0.75rem, 0.75vw, 240rem) clamp(0.75rem, 0.75vw, 240rem)",
      }}
    >
      <div
        className="flex flex-col lg:flex-row"
        style={{
          gap: "clamp(0.5rem, 0.7vw, 240rem)",
        }}
      >
        {columns.map((column, columnIndex) => (
          <div
            key={`col-${columnIndex}`}
            className="flex-1 w-full col"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: "clamp(0.5rem, 0.5vw, 240rem)",
            }}
          >
            {column.map((project: Project) => (
              <Link href={project.locked ? '#':`/projects/${project.link}`}
                key={project.id}
              >

                <div
                  className="work-item group relative overflow-hidden cursor-pointer bg-black"
                  style={{
                    width: '100%',
                    marginBottom: "clamp(0.5rem, 0.5vw, 240rem)",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >

                  <div className={` w-full h-auto ${project.aspectRatio ? `aspect-${project.aspectRatio}` : 'aspect-landscape'
                    }`}>
                    {(project.type === 'video') ? (
                      <video
                        src={project.image}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`w-full h-full object-cover ${project.logoImage ? 'p-4 object-contain' : ''}`}
                      />
                    ) : (
                      <Image
                        width={400}
                        height={400}
                        src={project.image}
                        alt={project.title}
                        className={`w-full h-full object-cover ${project.logoImage ? 'p-4 object-contain' : ''}`}
                        loading="lazy"
                      />
                    )}

                  </div>

                  <div className="  flex justify-between items-end"
                    style={{
                      padding: "clamp(0.5rem, 0.5vw, 240rem) 0 clamp(0.5rem, 0.5vw, 240rem)",
                    }}
                  >
                    <div>
                      <h3
                        id="work-name"
                        style={{
                          fontSize: "clamp(0.8rem, 0.7vw, 240rem)",
                        }}
                        className="text-base font-normal mono tracking-tight uppercase text-white"
                      >
                        {project.title}
                      </h3>
                      {project.subtitle && (
                        <p
                          id="work-date"
                          style={{
                            fontSize: "clamp(0.8rem, 0.6vw, 240rem)",
                          }}
                          className="mono uppercase text-white/60 tracking-wide"
                        >
                          {project.subtitle}
                        </p>
                      )}
                    </div>
                  </div>

                  {project.locked && (
                    <div className="absolute top-4 right-4 bg-[#131313] text-white  mono rounded-md "
                      style={{
                        padding: "clamp(0.25rem, 0.25vw, 100rem) clamp(0.5rem, 0.75vw, 100rem)",
                        fontSize: "clamp(0.5rem, 0.75vw, 100rem)"
                      }}
                    >
                      LOCKED
                    </div>
                  )}

                  {project.locked ? "" : <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                  }

                </div>
              </Link>

            ))}

          </div>

        ))}
      </div>
    </div>
  )
}

export default Projects
