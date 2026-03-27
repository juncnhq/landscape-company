import { NextAdminOptions } from "@premieroctet/next-admin";

export const nextAdminOptions: NextAdminOptions = {
  model: {
    Project: {
      toString: (p) => p.title,
      list: {
        search: ["title", "category"],
        fields: {
          title: {},
          category: {},
          published: {},
        },
        defaultSort: { field: "createdAt", direction: "desc" },
      },
      edit: {
        display: ["title", "titleEn", "slug", "category", "location", "area", "duration", "client", "year", "image", "description", "descriptionEn", "published", "images"],
      },
    },
    ProjectImage: {
      toString: (p) => p.url,
      edit: {
        display: ["url", "order", "project"],
      },
    },
    HeroSlide: {
      toString: (h) => h.labelVi,
      list: {
        search: ["labelVi"],
        fields: {
          labelVi: {},
          order: {},
          published: {},
        },
        defaultSort: { field: "order", direction: "asc" },
      },
      edit: {
        display: ["url", "labelVi", "labelEn", "order", "published"],
      },
    },
    Service: {
      toString: (s) => s.titleVi,
      list: {
        search: ["titleVi"],
        fields: {
          titleVi: {},
          order: {},
          published: {},
        },
        defaultSort: { field: "order", direction: "asc" },
      },
      edit: {
        display: ["number", "titleVi", "titleEn", "descVi", "descEn", "tag", "iconSvg", "order", "published"],
      },
    },
    Partner: {
      toString: (p) => p.name,
      list: {
        search: ["name"],
        fields: {
          name: {},
          sector: {},
          order: {},
          published: {},
        },
        defaultSort: { field: "order", direction: "asc" },
      },
      edit: {
        display: ["name", "sector", "sectorEn", "descVi", "descEn", "founded", "hq", "statLabelVi", "statLabelEn", "statValue", "projectsVi", "projectsEn", "highlightVi", "highlightEn", "order", "published"],
      },
    },
    TimelineItem: {
      toString: (t) => `${t.year} - ${t.title}`,
      list: {
        search: ["year", "title"],
        fields: {
          year: {},
          title: {},
          order: {},
        },
        defaultSort: { field: "order", direction: "asc" },
      },
      edit: {
        display: ["year", "title", "titleEn", "description", "descriptionEn", "order"],
      },
    },
    JobPosition: {
      toString: (j) => j.titleVi,
      list: {
        search: ["titleVi"],
        fields: {
          titleVi: {},
          order: {},
          published: {},
        },
        defaultSort: { field: "order", direction: "asc" },
      },
      edit: {
        display: ["titleVi", "titleEn", "typeVi", "typeEn", "locationVi", "locationEn", "descVi", "descEn", "order", "published"],
      },
    },
    NewsArticle: {
      toString: (n) => n.titleVi,
      list: {
        search: ["titleVi"],
        fields: {
          titleVi: {},
          published: {},
          publishedAt: {},
        },
        defaultSort: { field: "createdAt", direction: "desc" },
      },
      edit: {
        display: ["slug", "titleVi", "titleEn", "summaryVi", "summaryEn", "contentVi", "contentEn", "image", "published", "publishedAt"],
      },
    },
  },
};
