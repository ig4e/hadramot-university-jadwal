import { z } from "zod";
import type { Prisma } from "@prisma/client";

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(["Serializable"]);

export const TableScalarFieldEnumSchema = z.enum([
  "id",
  "type",
  "level",
  "semester",
  "majorId",
  "updatedAt",
  "createdAt",
]);

export const TableSubjectScalarFieldEnumSchema = z.enum([
  "id",
  "startsAt",
  "endsAt",
  "tableId",
  "dayId",
  "subjectId",
  "teacherId",
  "hallId",
]);

export const TeacherScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "updatedAt",
  "createdAt",
]);

export const TeacherWorkDateScalarFieldEnumSchema = z.enum([
  "id",
  "startsAt",
  "endsAt",
  "updatedAt",
  "createdAt",
  "teacherId",
  "dayId",
]);

export const MajorScalarFieldEnumSchema = z.enum([
  "id",
  "type",
  "name",
  "studentsCount",
  "updatedAt",
  "createdAt",
]);

export const HallScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "studentsCount",
  "updatedAt",
  "createdAt",
]);

export const SubjectScalarFieldEnumSchema = z.enum([
  "id",
  "name",
  "updatedAt",
  "createdAt",
]);

export const DayScalarFieldEnumSchema = z.enum(["id", "name"]);

export const SortOrderSchema = z.enum(["asc", "desc"]);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// TABLE SCHEMA
/////////////////////////////////////////

export const TableSchema = z.object({
  id: z.number().int(),
  type: z.number().int(),
  level: z.number().int(),
  semester: z.number().int(),
  majorId: z.number().int(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

export type Table = z.infer<typeof TableSchema>;

/////////////////////////////////////////
// TABLE SUBJECT SCHEMA
/////////////////////////////////////////

export const TableSubjectSchema = z.object({
  id: z.number().int(),
  startsAt: z.number(),
  endsAt: z.number(),
  tableId: z.number().int(),
  dayId: z.number().int(),
  subjectId: z.number().int(),
  teacherId: z.number().int(),
  hallId: z.number().int(),
});

export type TableSubject = z.infer<typeof TableSubjectSchema>;

/////////////////////////////////////////
// TEACHER SCHEMA
/////////////////////////////////////////

export const TeacherSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

export type Teacher = z.infer<typeof TeacherSchema>;

/////////////////////////////////////////
// TEACHER WORK DATE SCHEMA
/////////////////////////////////////////

export const TeacherWorkDateSchema = z.object({
  id: z.number().int(),
  startsAt: z.number(),
  endsAt: z.number(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  teacherId: z.number().int(),
  dayId: z.number().int(),
});

export type TeacherWorkDate = z.infer<typeof TeacherWorkDateSchema>;

/////////////////////////////////////////
// MAJOR SCHEMA
/////////////////////////////////////////

export const MajorSchema = z.object({
  id: z.number().int(),
  type: z.number().int(),
  name: z.string(),
  studentsCount: z.number().int(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

export type Major = z.infer<typeof MajorSchema>;

/////////////////////////////////////////
// HALL SCHEMA
/////////////////////////////////////////

export const HallSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  studentsCount: z.number().int(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

export type Hall = z.infer<typeof HallSchema>;

/////////////////////////////////////////
// SUBJECT SCHEMA
/////////////////////////////////////////

export const SubjectSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  updatedAt: z.coerce.date(),
  createdAt: z.coerce.date(),
});

export type Subject = z.infer<typeof SubjectSchema>;

/////////////////////////////////////////
// DAY SCHEMA
/////////////////////////////////////////

export const DaySchema = z.object({
  id: z.number().int(),
  name: z.string(),
});

export type Day = z.infer<typeof DaySchema>;

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// TABLE
//------------------------------------------------------

export const TableIncludeSchema: z.ZodType<Prisma.TableInclude> = z
  .object({
    major: z.union([z.boolean(), z.lazy(() => MajorArgsSchema)]).optional(),
    subjects: z
      .union([z.boolean(), z.lazy(() => TableSubjectFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => TableCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const TableArgsSchema: z.ZodType<Prisma.TableDefaultArgs> = z
  .object({
    select: z.lazy(() => TableSelectSchema).optional(),
    include: z.lazy(() => TableIncludeSchema).optional(),
  })
  .strict();

export const TableCountOutputTypeArgsSchema: z.ZodType<Prisma.TableCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => TableCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const TableCountOutputTypeSelectSchema: z.ZodType<Prisma.TableCountOutputTypeSelect> =
  z
    .object({
      subjects: z.boolean().optional(),
    })
    .strict();

export const TableSelectSchema: z.ZodType<Prisma.TableSelect> = z
  .object({
    id: z.boolean().optional(),
    type: z.boolean().optional(),
    level: z.boolean().optional(),
    semester: z.boolean().optional(),
    majorId: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    major: z.union([z.boolean(), z.lazy(() => MajorArgsSchema)]).optional(),
    subjects: z
      .union([z.boolean(), z.lazy(() => TableSubjectFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => TableCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// TABLE SUBJECT
//------------------------------------------------------

export const TableSubjectIncludeSchema: z.ZodType<Prisma.TableSubjectInclude> =
  z
    .object({
      table: z.union([z.boolean(), z.lazy(() => TableArgsSchema)]).optional(),
      day: z.union([z.boolean(), z.lazy(() => DayArgsSchema)]).optional(),
      subject: z
        .union([z.boolean(), z.lazy(() => SubjectArgsSchema)])
        .optional(),
      teacher: z
        .union([z.boolean(), z.lazy(() => TeacherArgsSchema)])
        .optional(),
      hall: z.union([z.boolean(), z.lazy(() => HallArgsSchema)]).optional(),
    })
    .strict();

export const TableSubjectArgsSchema: z.ZodType<Prisma.TableSubjectDefaultArgs> =
  z
    .object({
      select: z.lazy(() => TableSubjectSelectSchema).optional(),
      include: z.lazy(() => TableSubjectIncludeSchema).optional(),
    })
    .strict();

export const TableSubjectSelectSchema: z.ZodType<Prisma.TableSubjectSelect> = z
  .object({
    id: z.boolean().optional(),
    startsAt: z.boolean().optional(),
    endsAt: z.boolean().optional(),
    tableId: z.boolean().optional(),
    dayId: z.boolean().optional(),
    subjectId: z.boolean().optional(),
    teacherId: z.boolean().optional(),
    hallId: z.boolean().optional(),
    table: z.union([z.boolean(), z.lazy(() => TableArgsSchema)]).optional(),
    day: z.union([z.boolean(), z.lazy(() => DayArgsSchema)]).optional(),
    subject: z.union([z.boolean(), z.lazy(() => SubjectArgsSchema)]).optional(),
    teacher: z.union([z.boolean(), z.lazy(() => TeacherArgsSchema)]).optional(),
    hall: z.union([z.boolean(), z.lazy(() => HallArgsSchema)]).optional(),
  })
  .strict();

// TEACHER
//------------------------------------------------------

export const TeacherIncludeSchema: z.ZodType<Prisma.TeacherInclude> = z
  .object({
    subjects: z
      .union([z.boolean(), z.lazy(() => SubjectFindManyArgsSchema)])
      .optional(),
    workDates: z
      .union([z.boolean(), z.lazy(() => TeacherWorkDateFindManyArgsSchema)])
      .optional(),
    tableSubjects: z
      .union([z.boolean(), z.lazy(() => TableSubjectFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => TeacherCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const TeacherArgsSchema: z.ZodType<Prisma.TeacherDefaultArgs> = z
  .object({
    select: z.lazy(() => TeacherSelectSchema).optional(),
    include: z.lazy(() => TeacherIncludeSchema).optional(),
  })
  .strict();

export const TeacherCountOutputTypeArgsSchema: z.ZodType<Prisma.TeacherCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => TeacherCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const TeacherCountOutputTypeSelectSchema: z.ZodType<Prisma.TeacherCountOutputTypeSelect> =
  z
    .object({
      subjects: z.boolean().optional(),
      workDates: z.boolean().optional(),
      tableSubjects: z.boolean().optional(),
    })
    .strict();

export const TeacherSelectSchema: z.ZodType<Prisma.TeacherSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    subjects: z
      .union([z.boolean(), z.lazy(() => SubjectFindManyArgsSchema)])
      .optional(),
    workDates: z
      .union([z.boolean(), z.lazy(() => TeacherWorkDateFindManyArgsSchema)])
      .optional(),
    tableSubjects: z
      .union([z.boolean(), z.lazy(() => TableSubjectFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => TeacherCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// TEACHER WORK DATE
//------------------------------------------------------

export const TeacherWorkDateIncludeSchema: z.ZodType<Prisma.TeacherWorkDateInclude> =
  z
    .object({
      day: z.union([z.boolean(), z.lazy(() => DayArgsSchema)]).optional(),
      teacher: z
        .union([z.boolean(), z.lazy(() => TeacherArgsSchema)])
        .optional(),
    })
    .strict();

export const TeacherWorkDateArgsSchema: z.ZodType<Prisma.TeacherWorkDateDefaultArgs> =
  z
    .object({
      select: z.lazy(() => TeacherWorkDateSelectSchema).optional(),
      include: z.lazy(() => TeacherWorkDateIncludeSchema).optional(),
    })
    .strict();

export const TeacherWorkDateSelectSchema: z.ZodType<Prisma.TeacherWorkDateSelect> =
  z
    .object({
      id: z.boolean().optional(),
      startsAt: z.boolean().optional(),
      endsAt: z.boolean().optional(),
      updatedAt: z.boolean().optional(),
      createdAt: z.boolean().optional(),
      teacherId: z.boolean().optional(),
      dayId: z.boolean().optional(),
      day: z.union([z.boolean(), z.lazy(() => DayArgsSchema)]).optional(),
      teacher: z
        .union([z.boolean(), z.lazy(() => TeacherArgsSchema)])
        .optional(),
    })
    .strict();

// MAJOR
//------------------------------------------------------

export const MajorIncludeSchema: z.ZodType<Prisma.MajorInclude> = z
  .object({
    tables: z
      .union([z.boolean(), z.lazy(() => TableFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => MajorCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const MajorArgsSchema: z.ZodType<Prisma.MajorDefaultArgs> = z
  .object({
    select: z.lazy(() => MajorSelectSchema).optional(),
    include: z.lazy(() => MajorIncludeSchema).optional(),
  })
  .strict();

export const MajorCountOutputTypeArgsSchema: z.ZodType<Prisma.MajorCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => MajorCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const MajorCountOutputTypeSelectSchema: z.ZodType<Prisma.MajorCountOutputTypeSelect> =
  z
    .object({
      tables: z.boolean().optional(),
    })
    .strict();

export const MajorSelectSchema: z.ZodType<Prisma.MajorSelect> = z
  .object({
    id: z.boolean().optional(),
    type: z.boolean().optional(),
    name: z.boolean().optional(),
    studentsCount: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    tables: z
      .union([z.boolean(), z.lazy(() => TableFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => MajorCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// HALL
//------------------------------------------------------

export const HallIncludeSchema: z.ZodType<Prisma.HallInclude> = z
  .object({
    tableSubjects: z
      .union([z.boolean(), z.lazy(() => TableSubjectFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => HallCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const HallArgsSchema: z.ZodType<Prisma.HallDefaultArgs> = z
  .object({
    select: z.lazy(() => HallSelectSchema).optional(),
    include: z.lazy(() => HallIncludeSchema).optional(),
  })
  .strict();

export const HallCountOutputTypeArgsSchema: z.ZodType<Prisma.HallCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => HallCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const HallCountOutputTypeSelectSchema: z.ZodType<Prisma.HallCountOutputTypeSelect> =
  z
    .object({
      tableSubjects: z.boolean().optional(),
    })
    .strict();

export const HallSelectSchema: z.ZodType<Prisma.HallSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    studentsCount: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    tableSubjects: z
      .union([z.boolean(), z.lazy(() => TableSubjectFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => HallCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// SUBJECT
//------------------------------------------------------

export const SubjectIncludeSchema: z.ZodType<Prisma.SubjectInclude> = z
  .object({
    teachers: z
      .union([z.boolean(), z.lazy(() => TeacherFindManyArgsSchema)])
      .optional(),
    tableSubjects: z
      .union([z.boolean(), z.lazy(() => TableSubjectFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => SubjectCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const SubjectArgsSchema: z.ZodType<Prisma.SubjectDefaultArgs> = z
  .object({
    select: z.lazy(() => SubjectSelectSchema).optional(),
    include: z.lazy(() => SubjectIncludeSchema).optional(),
  })
  .strict();

export const SubjectCountOutputTypeArgsSchema: z.ZodType<Prisma.SubjectCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => SubjectCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const SubjectCountOutputTypeSelectSchema: z.ZodType<Prisma.SubjectCountOutputTypeSelect> =
  z
    .object({
      teachers: z.boolean().optional(),
      tableSubjects: z.boolean().optional(),
    })
    .strict();

export const SubjectSelectSchema: z.ZodType<Prisma.SubjectSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    teachers: z
      .union([z.boolean(), z.lazy(() => TeacherFindManyArgsSchema)])
      .optional(),
    tableSubjects: z
      .union([z.boolean(), z.lazy(() => TableSubjectFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => SubjectCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

// DAY
//------------------------------------------------------

export const DayIncludeSchema: z.ZodType<Prisma.DayInclude> = z
  .object({
    teacherWorkDates: z
      .union([z.boolean(), z.lazy(() => TeacherWorkDateFindManyArgsSchema)])
      .optional(),
    tableSubjects: z
      .union([z.boolean(), z.lazy(() => TableSubjectFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => DayCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

export const DayArgsSchema: z.ZodType<Prisma.DayDefaultArgs> = z
  .object({
    select: z.lazy(() => DaySelectSchema).optional(),
    include: z.lazy(() => DayIncludeSchema).optional(),
  })
  .strict();

export const DayCountOutputTypeArgsSchema: z.ZodType<Prisma.DayCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => DayCountOutputTypeSelectSchema).nullish(),
    })
    .strict();

export const DayCountOutputTypeSelectSchema: z.ZodType<Prisma.DayCountOutputTypeSelect> =
  z
    .object({
      teacherWorkDates: z.boolean().optional(),
      tableSubjects: z.boolean().optional(),
    })
    .strict();

export const DaySelectSchema: z.ZodType<Prisma.DaySelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    teacherWorkDates: z
      .union([z.boolean(), z.lazy(() => TeacherWorkDateFindManyArgsSchema)])
      .optional(),
    tableSubjects: z
      .union([z.boolean(), z.lazy(() => TableSubjectFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => DayCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict();

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const TableWhereInputSchema: z.ZodType<Prisma.TableWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TableWhereInputSchema),
        z.lazy(() => TableWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TableWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TableWhereInputSchema),
        z.lazy(() => TableWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    type: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    level: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    semester: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    majorId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    major: z
      .union([
        z.lazy(() => MajorRelationFilterSchema),
        z.lazy(() => MajorWhereInputSchema),
      ])
      .optional(),
    subjects: z.lazy(() => TableSubjectListRelationFilterSchema).optional(),
  })
  .strict();

export const TableOrderByWithRelationInputSchema: z.ZodType<Prisma.TableOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      level: z.lazy(() => SortOrderSchema).optional(),
      semester: z.lazy(() => SortOrderSchema).optional(),
      majorId: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      major: z.lazy(() => MajorOrderByWithRelationInputSchema).optional(),
      subjects: z
        .lazy(() => TableSubjectOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const TableWhereUniqueInputSchema: z.ZodType<Prisma.TableWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => TableWhereInputSchema),
              z.lazy(() => TableWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TableWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => TableWhereInputSchema),
              z.lazy(() => TableWhereInputSchema).array(),
            ])
            .optional(),
          type: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          level: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          semester: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          majorId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          major: z
            .union([
              z.lazy(() => MajorRelationFilterSchema),
              z.lazy(() => MajorWhereInputSchema),
            ])
            .optional(),
          subjects: z
            .lazy(() => TableSubjectListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const TableOrderByWithAggregationInputSchema: z.ZodType<Prisma.TableOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      level: z.lazy(() => SortOrderSchema).optional(),
      semester: z.lazy(() => SortOrderSchema).optional(),
      majorId: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => TableCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => TableAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TableMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TableMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => TableSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const TableScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TableScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TableScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TableScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TableScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TableScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TableScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      type: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      level: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      semester: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      majorId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectWhereInputSchema: z.ZodType<Prisma.TableSubjectWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TableSubjectWhereInputSchema),
          z.lazy(() => TableSubjectWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TableSubjectWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TableSubjectWhereInputSchema),
          z.lazy(() => TableSubjectWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      startsAt: z
        .union([z.lazy(() => FloatFilterSchema), z.number()])
        .optional(),
      endsAt: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
      tableId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      dayId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      subjectId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      teacherId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      hallId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      table: z
        .union([
          z.lazy(() => TableRelationFilterSchema),
          z.lazy(() => TableWhereInputSchema),
        ])
        .optional(),
      day: z
        .union([
          z.lazy(() => DayRelationFilterSchema),
          z.lazy(() => DayWhereInputSchema),
        ])
        .optional(),
      subject: z
        .union([
          z.lazy(() => SubjectRelationFilterSchema),
          z.lazy(() => SubjectWhereInputSchema),
        ])
        .optional(),
      teacher: z
        .union([
          z.lazy(() => TeacherRelationFilterSchema),
          z.lazy(() => TeacherWhereInputSchema),
        ])
        .optional(),
      hall: z
        .union([
          z.lazy(() => HallRelationFilterSchema),
          z.lazy(() => HallWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectOrderByWithRelationInputSchema: z.ZodType<Prisma.TableSubjectOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      tableId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
      subjectId: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      hallId: z.lazy(() => SortOrderSchema).optional(),
      table: z.lazy(() => TableOrderByWithRelationInputSchema).optional(),
      day: z.lazy(() => DayOrderByWithRelationInputSchema).optional(),
      subject: z.lazy(() => SubjectOrderByWithRelationInputSchema).optional(),
      teacher: z.lazy(() => TeacherOrderByWithRelationInputSchema).optional(),
      hall: z.lazy(() => HallOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const TableSubjectWhereUniqueInputSchema: z.ZodType<Prisma.TableSubjectWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => TableSubjectWhereInputSchema),
              z.lazy(() => TableSubjectWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TableSubjectWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => TableSubjectWhereInputSchema),
              z.lazy(() => TableSubjectWhereInputSchema).array(),
            ])
            .optional(),
          startsAt: z
            .union([z.lazy(() => FloatFilterSchema), z.number()])
            .optional(),
          endsAt: z
            .union([z.lazy(() => FloatFilterSchema), z.number()])
            .optional(),
          tableId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          dayId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          subjectId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          teacherId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          hallId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          table: z
            .union([
              z.lazy(() => TableRelationFilterSchema),
              z.lazy(() => TableWhereInputSchema),
            ])
            .optional(),
          day: z
            .union([
              z.lazy(() => DayRelationFilterSchema),
              z.lazy(() => DayWhereInputSchema),
            ])
            .optional(),
          subject: z
            .union([
              z.lazy(() => SubjectRelationFilterSchema),
              z.lazy(() => SubjectWhereInputSchema),
            ])
            .optional(),
          teacher: z
            .union([
              z.lazy(() => TeacherRelationFilterSchema),
              z.lazy(() => TeacherWhereInputSchema),
            ])
            .optional(),
          hall: z
            .union([
              z.lazy(() => HallRelationFilterSchema),
              z.lazy(() => HallWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const TableSubjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.TableSubjectOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      tableId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
      subjectId: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      hallId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => TableSubjectCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z.lazy(() => TableSubjectAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TableSubjectMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TableSubjectMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => TableSubjectSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const TableSubjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TableSubjectScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TableSubjectScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => TableSubjectScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TableSubjectScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TableSubjectScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => TableSubjectScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      startsAt: z
        .union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()])
        .optional(),
      endsAt: z
        .union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()])
        .optional(),
      tableId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      dayId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      subjectId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      teacherId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      hallId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const TeacherWhereInputSchema: z.ZodType<Prisma.TeacherWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => TeacherWhereInputSchema),
        z.lazy(() => TeacherWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => TeacherWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => TeacherWhereInputSchema),
        z.lazy(() => TeacherWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    subjects: z.lazy(() => SubjectListRelationFilterSchema).optional(),
    workDates: z.lazy(() => TeacherWorkDateListRelationFilterSchema).optional(),
    tableSubjects: z
      .lazy(() => TableSubjectListRelationFilterSchema)
      .optional(),
  })
  .strict();

export const TeacherOrderByWithRelationInputSchema: z.ZodType<Prisma.TeacherOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      subjects: z
        .lazy(() => SubjectOrderByRelationAggregateInputSchema)
        .optional(),
      workDates: z
        .lazy(() => TeacherWorkDateOrderByRelationAggregateInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const TeacherWhereUniqueInputSchema: z.ZodType<Prisma.TeacherWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        name: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        name: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => TeacherWhereInputSchema),
              z.lazy(() => TeacherWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TeacherWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => TeacherWhereInputSchema),
              z.lazy(() => TeacherWhereInputSchema).array(),
            ])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          subjects: z.lazy(() => SubjectListRelationFilterSchema).optional(),
          workDates: z
            .lazy(() => TeacherWorkDateListRelationFilterSchema)
            .optional(),
          tableSubjects: z
            .lazy(() => TableSubjectListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const TeacherOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeacherOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => TeacherCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => TeacherAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => TeacherMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => TeacherMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => TeacherSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const TeacherScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeacherScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TeacherScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TeacherScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TeacherScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TeacherScalarWhereWithAggregatesInputSchema),
          z.lazy(() => TeacherScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateWhereInputSchema: z.ZodType<Prisma.TeacherWorkDateWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TeacherWorkDateWhereInputSchema),
          z.lazy(() => TeacherWorkDateWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TeacherWorkDateWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TeacherWorkDateWhereInputSchema),
          z.lazy(() => TeacherWorkDateWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      startsAt: z
        .union([z.lazy(() => FloatFilterSchema), z.number()])
        .optional(),
      endsAt: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      teacherId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      dayId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      day: z
        .union([
          z.lazy(() => DayRelationFilterSchema),
          z.lazy(() => DayWhereInputSchema),
        ])
        .optional(),
      teacher: z
        .union([
          z.lazy(() => TeacherRelationFilterSchema),
          z.lazy(() => TeacherWhereInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateOrderByWithRelationInputSchema: z.ZodType<Prisma.TeacherWorkDateOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
      day: z.lazy(() => DayOrderByWithRelationInputSchema).optional(),
      teacher: z.lazy(() => TeacherOrderByWithRelationInputSchema).optional(),
    })
    .strict();

export const TeacherWorkDateWhereUniqueInputSchema: z.ZodType<Prisma.TeacherWorkDateWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => TeacherWorkDateWhereInputSchema),
              z.lazy(() => TeacherWorkDateWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => TeacherWorkDateWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => TeacherWorkDateWhereInputSchema),
              z.lazy(() => TeacherWorkDateWhereInputSchema).array(),
            ])
            .optional(),
          startsAt: z
            .union([z.lazy(() => FloatFilterSchema), z.number()])
            .optional(),
          endsAt: z
            .union([z.lazy(() => FloatFilterSchema), z.number()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          teacherId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          dayId: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          day: z
            .union([
              z.lazy(() => DayRelationFilterSchema),
              z.lazy(() => DayWhereInputSchema),
            ])
            .optional(),
          teacher: z
            .union([
              z.lazy(() => TeacherRelationFilterSchema),
              z.lazy(() => TeacherWhereInputSchema),
            ])
            .optional(),
        })
        .strict(),
    );

export const TeacherWorkDateOrderByWithAggregationInputSchema: z.ZodType<Prisma.TeacherWorkDateOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
      _count: z
        .lazy(() => TeacherWorkDateCountOrderByAggregateInputSchema)
        .optional(),
      _avg: z
        .lazy(() => TeacherWorkDateAvgOrderByAggregateInputSchema)
        .optional(),
      _max: z
        .lazy(() => TeacherWorkDateMaxOrderByAggregateInputSchema)
        .optional(),
      _min: z
        .lazy(() => TeacherWorkDateMinOrderByAggregateInputSchema)
        .optional(),
      _sum: z
        .lazy(() => TeacherWorkDateSumOrderByAggregateInputSchema)
        .optional(),
    })
    .strict();

export const TeacherWorkDateScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.TeacherWorkDateScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TeacherWorkDateScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => TeacherWorkDateScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TeacherWorkDateScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TeacherWorkDateScalarWhereWithAggregatesInputSchema),
          z
            .lazy(() => TeacherWorkDateScalarWhereWithAggregatesInputSchema)
            .array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      startsAt: z
        .union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()])
        .optional(),
      endsAt: z
        .union([z.lazy(() => FloatWithAggregatesFilterSchema), z.number()])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      teacherId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      dayId: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
    })
    .strict();

export const MajorWhereInputSchema: z.ZodType<Prisma.MajorWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => MajorWhereInputSchema),
        z.lazy(() => MajorWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => MajorWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => MajorWhereInputSchema),
        z.lazy(() => MajorWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    type: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    studentsCount: z
      .union([z.lazy(() => IntFilterSchema), z.number()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    tables: z.lazy(() => TableListRelationFilterSchema).optional(),
  })
  .strict();

export const MajorOrderByWithRelationInputSchema: z.ZodType<Prisma.MajorOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      tables: z.lazy(() => TableOrderByRelationAggregateInputSchema).optional(),
    })
    .strict();

export const MajorWhereUniqueInputSchema: z.ZodType<Prisma.MajorWhereUniqueInput> =
  z
    .object({
      id: z.number().int(),
    })
    .and(
      z
        .object({
          id: z.number().int().optional(),
          AND: z
            .union([
              z.lazy(() => MajorWhereInputSchema),
              z.lazy(() => MajorWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => MajorWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => MajorWhereInputSchema),
              z.lazy(() => MajorWhereInputSchema).array(),
            ])
            .optional(),
          type: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          name: z
            .union([z.lazy(() => StringFilterSchema), z.string()])
            .optional(),
          studentsCount: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          tables: z.lazy(() => TableListRelationFilterSchema).optional(),
        })
        .strict(),
    );

export const MajorOrderByWithAggregationInputSchema: z.ZodType<Prisma.MajorOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => MajorCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => MajorAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => MajorMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => MajorMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => MajorSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const MajorScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MajorScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => MajorScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MajorScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => MajorScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => MajorScalarWhereWithAggregatesInputSchema),
          z.lazy(() => MajorScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      type: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      studentsCount: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const HallWhereInputSchema: z.ZodType<Prisma.HallWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => HallWhereInputSchema),
        z.lazy(() => HallWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => HallWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => HallWhereInputSchema),
        z.lazy(() => HallWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    studentsCount: z
      .union([z.lazy(() => IntFilterSchema), z.number()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    tableSubjects: z
      .lazy(() => TableSubjectListRelationFilterSchema)
      .optional(),
  })
  .strict();

export const HallOrderByWithRelationInputSchema: z.ZodType<Prisma.HallOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      tableSubjects: z
        .lazy(() => TableSubjectOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const HallWhereUniqueInputSchema: z.ZodType<Prisma.HallWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        name: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        name: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => HallWhereInputSchema),
              z.lazy(() => HallWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => HallWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => HallWhereInputSchema),
              z.lazy(() => HallWhereInputSchema).array(),
            ])
            .optional(),
          studentsCount: z
            .union([z.lazy(() => IntFilterSchema), z.number().int()])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          tableSubjects: z
            .lazy(() => TableSubjectListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const HallOrderByWithAggregationInputSchema: z.ZodType<Prisma.HallOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => HallCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => HallAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => HallMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => HallMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => HallSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const HallScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.HallScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => HallScalarWhereWithAggregatesInputSchema),
          z.lazy(() => HallScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => HallScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => HallScalarWhereWithAggregatesInputSchema),
          z.lazy(() => HallScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      studentsCount: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const SubjectWhereInputSchema: z.ZodType<Prisma.SubjectWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => SubjectWhereInputSchema),
        z.lazy(() => SubjectWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SubjectWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SubjectWhereInputSchema),
        z.lazy(() => SubjectWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    teachers: z.lazy(() => TeacherListRelationFilterSchema).optional(),
    tableSubjects: z
      .lazy(() => TableSubjectListRelationFilterSchema)
      .optional(),
  })
  .strict();

export const SubjectOrderByWithRelationInputSchema: z.ZodType<Prisma.SubjectOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      teachers: z
        .lazy(() => TeacherOrderByRelationAggregateInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const SubjectWhereUniqueInputSchema: z.ZodType<Prisma.SubjectWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        name: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        name: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => SubjectWhereInputSchema),
              z.lazy(() => SubjectWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => SubjectWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => SubjectWhereInputSchema),
              z.lazy(() => SubjectWhereInputSchema).array(),
            ])
            .optional(),
          updatedAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          createdAt: z
            .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
            .optional(),
          teachers: z.lazy(() => TeacherListRelationFilterSchema).optional(),
          tableSubjects: z
            .lazy(() => TableSubjectListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const SubjectOrderByWithAggregationInputSchema: z.ZodType<Prisma.SubjectOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => SubjectCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => SubjectAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => SubjectMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => SubjectMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => SubjectSumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const SubjectScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SubjectScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SubjectScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SubjectScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubjectScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SubjectScalarWhereWithAggregatesInputSchema),
          z.lazy(() => SubjectScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
      updatedAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
      createdAt: z
        .union([
          z.lazy(() => DateTimeWithAggregatesFilterSchema),
          z.coerce.date(),
        ])
        .optional(),
    })
    .strict();

export const DayWhereInputSchema: z.ZodType<Prisma.DayWhereInput> = z
  .object({
    AND: z
      .union([
        z.lazy(() => DayWhereInputSchema),
        z.lazy(() => DayWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => DayWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => DayWhereInputSchema),
        z.lazy(() => DayWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    teacherWorkDates: z
      .lazy(() => TeacherWorkDateListRelationFilterSchema)
      .optional(),
    tableSubjects: z
      .lazy(() => TableSubjectListRelationFilterSchema)
      .optional(),
  })
  .strict();

export const DayOrderByWithRelationInputSchema: z.ZodType<Prisma.DayOrderByWithRelationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      teacherWorkDates: z
        .lazy(() => TeacherWorkDateOrderByRelationAggregateInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectOrderByRelationAggregateInputSchema)
        .optional(),
    })
    .strict();

export const DayWhereUniqueInputSchema: z.ZodType<Prisma.DayWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.number().int(),
        name: z.string(),
      }),
      z.object({
        id: z.number().int(),
      }),
      z.object({
        name: z.string(),
      }),
    ])
    .and(
      z
        .object({
          id: z.number().int().optional(),
          name: z.string().optional(),
          AND: z
            .union([
              z.lazy(() => DayWhereInputSchema),
              z.lazy(() => DayWhereInputSchema).array(),
            ])
            .optional(),
          OR: z
            .lazy(() => DayWhereInputSchema)
            .array()
            .optional(),
          NOT: z
            .union([
              z.lazy(() => DayWhereInputSchema),
              z.lazy(() => DayWhereInputSchema).array(),
            ])
            .optional(),
          teacherWorkDates: z
            .lazy(() => TeacherWorkDateListRelationFilterSchema)
            .optional(),
          tableSubjects: z
            .lazy(() => TableSubjectListRelationFilterSchema)
            .optional(),
        })
        .strict(),
    );

export const DayOrderByWithAggregationInputSchema: z.ZodType<Prisma.DayOrderByWithAggregationInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      _count: z.lazy(() => DayCountOrderByAggregateInputSchema).optional(),
      _avg: z.lazy(() => DayAvgOrderByAggregateInputSchema).optional(),
      _max: z.lazy(() => DayMaxOrderByAggregateInputSchema).optional(),
      _min: z.lazy(() => DayMinOrderByAggregateInputSchema).optional(),
      _sum: z.lazy(() => DaySumOrderByAggregateInputSchema).optional(),
    })
    .strict();

export const DayScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.DayScalarWhereWithAggregatesInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => DayScalarWhereWithAggregatesInputSchema),
          z.lazy(() => DayScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => DayScalarWhereWithAggregatesInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => DayScalarWhereWithAggregatesInputSchema),
          z.lazy(() => DayScalarWhereWithAggregatesInputSchema).array(),
        ])
        .optional(),
      id: z
        .union([z.lazy(() => IntWithAggregatesFilterSchema), z.number()])
        .optional(),
      name: z
        .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
        .optional(),
    })
    .strict();

export const TableCreateInputSchema: z.ZodType<Prisma.TableCreateInput> = z
  .object({
    type: z.number().int(),
    level: z.number().int(),
    semester: z.number().int(),
    updatedAt: z.coerce.date().optional(),
    createdAt: z.coerce.date().optional(),
    major: z.lazy(() => MajorCreateNestedOneWithoutTablesInputSchema),
    subjects: z
      .lazy(() => TableSubjectCreateNestedManyWithoutTableInputSchema)
      .optional(),
  })
  .strict();

export const TableUncheckedCreateInputSchema: z.ZodType<Prisma.TableUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      type: z.number().int(),
      level: z.number().int(),
      semester: z.number().int(),
      majorId: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      subjects: z
        .lazy(
          () => TableSubjectUncheckedCreateNestedManyWithoutTableInputSchema,
        )
        .optional(),
    })
    .strict();

export const TableUpdateInputSchema: z.ZodType<Prisma.TableUpdateInput> = z
  .object({
    type: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    level: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    semester: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    major: z
      .lazy(() => MajorUpdateOneRequiredWithoutTablesNestedInputSchema)
      .optional(),
    subjects: z
      .lazy(() => TableSubjectUpdateManyWithoutTableNestedInputSchema)
      .optional(),
  })
  .strict();

export const TableUncheckedUpdateInputSchema: z.ZodType<Prisma.TableUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      level: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      semester: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      majorId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjects: z
        .lazy(
          () => TableSubjectUncheckedUpdateManyWithoutTableNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const TableUpdateManyMutationInputSchema: z.ZodType<Prisma.TableUpdateManyMutationInput> =
  z
    .object({
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      level: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      semester: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TableUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      level: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      semester: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      majorId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectCreateInputSchema: z.ZodType<Prisma.TableSubjectCreateInput> =
  z
    .object({
      startsAt: z.number(),
      endsAt: z.number(),
      table: z.lazy(() => TableCreateNestedOneWithoutSubjectsInputSchema),
      day: z.lazy(() => DayCreateNestedOneWithoutTableSubjectsInputSchema),
      subject: z.lazy(
        () => SubjectCreateNestedOneWithoutTableSubjectsInputSchema,
      ),
      teacher: z.lazy(
        () => TeacherCreateNestedOneWithoutTableSubjectsInputSchema,
      ),
      hall: z.lazy(() => HallCreateNestedOneWithoutTableSubjectsInputSchema),
    })
    .strict();

export const TableSubjectUncheckedCreateInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      startsAt: z.number(),
      endsAt: z.number(),
      tableId: z.number().int(),
      dayId: z.number().int(),
      subjectId: z.number().int(),
      teacherId: z.number().int(),
      hallId: z.number().int(),
    })
    .strict();

export const TableSubjectUpdateInputSchema: z.ZodType<Prisma.TableSubjectUpdateInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      table: z
        .lazy(() => TableUpdateOneRequiredWithoutSubjectsNestedInputSchema)
        .optional(),
      day: z
        .lazy(() => DayUpdateOneRequiredWithoutTableSubjectsNestedInputSchema)
        .optional(),
      subject: z
        .lazy(
          () => SubjectUpdateOneRequiredWithoutTableSubjectsNestedInputSchema,
        )
        .optional(),
      teacher: z
        .lazy(
          () => TeacherUpdateOneRequiredWithoutTableSubjectsNestedInputSchema,
        )
        .optional(),
      hall: z
        .lazy(() => HallUpdateOneRequiredWithoutTableSubjectsNestedInputSchema)
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjectId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hallId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpdateManyMutationInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyMutationInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjectId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hallId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherCreateInputSchema: z.ZodType<Prisma.TeacherCreateInput> = z
  .object({
    name: z.string(),
    updatedAt: z.coerce.date().optional(),
    createdAt: z.coerce.date().optional(),
    subjects: z
      .lazy(() => SubjectCreateNestedManyWithoutTeachersInputSchema)
      .optional(),
    workDates: z
      .lazy(() => TeacherWorkDateCreateNestedManyWithoutTeacherInputSchema)
      .optional(),
    tableSubjects: z
      .lazy(() => TableSubjectCreateNestedManyWithoutTeacherInputSchema)
      .optional(),
  })
  .strict();

export const TeacherUncheckedCreateInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      subjects: z
        .lazy(() => SubjectUncheckedCreateNestedManyWithoutTeachersInputSchema)
        .optional(),
      workDates: z
        .lazy(
          () =>
            TeacherWorkDateUncheckedCreateNestedManyWithoutTeacherInputSchema,
        )
        .optional(),
      tableSubjects: z
        .lazy(
          () => TableSubjectUncheckedCreateNestedManyWithoutTeacherInputSchema,
        )
        .optional(),
    })
    .strict();

export const TeacherUpdateInputSchema: z.ZodType<Prisma.TeacherUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    subjects: z
      .lazy(() => SubjectUpdateManyWithoutTeachersNestedInputSchema)
      .optional(),
    workDates: z
      .lazy(() => TeacherWorkDateUpdateManyWithoutTeacherNestedInputSchema)
      .optional(),
    tableSubjects: z
      .lazy(() => TableSubjectUpdateManyWithoutTeacherNestedInputSchema)
      .optional(),
  })
  .strict();

export const TeacherUncheckedUpdateInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjects: z
        .lazy(() => SubjectUncheckedUpdateManyWithoutTeachersNestedInputSchema)
        .optional(),
      workDates: z
        .lazy(
          () =>
            TeacherWorkDateUncheckedUpdateManyWithoutTeacherNestedInputSchema,
        )
        .optional(),
      tableSubjects: z
        .lazy(
          () => TableSubjectUncheckedUpdateManyWithoutTeacherNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const TeacherUpdateManyMutationInputSchema: z.ZodType<Prisma.TeacherUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateCreateInputSchema: z.ZodType<Prisma.TeacherWorkDateCreateInput> =
  z
    .object({
      startsAt: z.number(),
      endsAt: z.number(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      day: z.lazy(() => DayCreateNestedOneWithoutTeacherWorkDatesInputSchema),
      teacher: z.lazy(() => TeacherCreateNestedOneWithoutWorkDatesInputSchema),
    })
    .strict();

export const TeacherWorkDateUncheckedCreateInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      startsAt: z.number(),
      endsAt: z.number(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      teacherId: z.number().int(),
      dayId: z.number().int(),
    })
    .strict();

export const TeacherWorkDateUpdateInputSchema: z.ZodType<Prisma.TeacherWorkDateUpdateInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      day: z
        .lazy(
          () => DayUpdateOneRequiredWithoutTeacherWorkDatesNestedInputSchema,
        )
        .optional(),
      teacher: z
        .lazy(() => TeacherUpdateOneRequiredWithoutWorkDatesNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeacherWorkDateUncheckedUpdateInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUpdateManyMutationInputSchema: z.ZodType<Prisma.TeacherWorkDateUpdateManyMutationInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUncheckedUpdateManyInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MajorCreateInputSchema: z.ZodType<Prisma.MajorCreateInput> = z
  .object({
    type: z.number().int().optional(),
    name: z.string(),
    studentsCount: z.number().int(),
    updatedAt: z.coerce.date().optional(),
    createdAt: z.coerce.date().optional(),
    tables: z
      .lazy(() => TableCreateNestedManyWithoutMajorInputSchema)
      .optional(),
  })
  .strict();

export const MajorUncheckedCreateInputSchema: z.ZodType<Prisma.MajorUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      type: z.number().int().optional(),
      name: z.string(),
      studentsCount: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      tables: z
        .lazy(() => TableUncheckedCreateNestedManyWithoutMajorInputSchema)
        .optional(),
    })
    .strict();

export const MajorUpdateInputSchema: z.ZodType<Prisma.MajorUpdateInput> = z
  .object({
    type: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    studentsCount: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    tables: z
      .lazy(() => TableUpdateManyWithoutMajorNestedInputSchema)
      .optional(),
  })
  .strict();

export const MajorUncheckedUpdateInputSchema: z.ZodType<Prisma.MajorUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      studentsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tables: z
        .lazy(() => TableUncheckedUpdateManyWithoutMajorNestedInputSchema)
        .optional(),
    })
    .strict();

export const MajorUpdateManyMutationInputSchema: z.ZodType<Prisma.MajorUpdateManyMutationInput> =
  z
    .object({
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      studentsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MajorUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MajorUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      studentsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HallCreateInputSchema: z.ZodType<Prisma.HallCreateInput> = z
  .object({
    name: z.string(),
    studentsCount: z.number().int(),
    updatedAt: z.coerce.date().optional(),
    createdAt: z.coerce.date().optional(),
    tableSubjects: z
      .lazy(() => TableSubjectCreateNestedManyWithoutHallInputSchema)
      .optional(),
  })
  .strict();

export const HallUncheckedCreateInputSchema: z.ZodType<Prisma.HallUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      studentsCount: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      tableSubjects: z
        .lazy(() => TableSubjectUncheckedCreateNestedManyWithoutHallInputSchema)
        .optional(),
    })
    .strict();

export const HallUpdateInputSchema: z.ZodType<Prisma.HallUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    studentsCount: z
      .union([
        z.number().int(),
        z.lazy(() => IntFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    tableSubjects: z
      .lazy(() => TableSubjectUpdateManyWithoutHallNestedInputSchema)
      .optional(),
  })
  .strict();

export const HallUncheckedUpdateInputSchema: z.ZodType<Prisma.HallUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      studentsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectUncheckedUpdateManyWithoutHallNestedInputSchema)
        .optional(),
    })
    .strict();

export const HallUpdateManyMutationInputSchema: z.ZodType<Prisma.HallUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      studentsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HallUncheckedUpdateManyInputSchema: z.ZodType<Prisma.HallUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      studentsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubjectCreateInputSchema: z.ZodType<Prisma.SubjectCreateInput> = z
  .object({
    name: z.string(),
    updatedAt: z.coerce.date().optional(),
    createdAt: z.coerce.date().optional(),
    teachers: z
      .lazy(() => TeacherCreateNestedManyWithoutSubjectsInputSchema)
      .optional(),
    tableSubjects: z
      .lazy(() => TableSubjectCreateNestedManyWithoutSubjectInputSchema)
      .optional(),
  })
  .strict();

export const SubjectUncheckedCreateInputSchema: z.ZodType<Prisma.SubjectUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      teachers: z
        .lazy(() => TeacherUncheckedCreateNestedManyWithoutSubjectsInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(
          () => TableSubjectUncheckedCreateNestedManyWithoutSubjectInputSchema,
        )
        .optional(),
    })
    .strict();

export const SubjectUpdateInputSchema: z.ZodType<Prisma.SubjectUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    teachers: z
      .lazy(() => TeacherUpdateManyWithoutSubjectsNestedInputSchema)
      .optional(),
    tableSubjects: z
      .lazy(() => TableSubjectUpdateManyWithoutSubjectNestedInputSchema)
      .optional(),
  })
  .strict();

export const SubjectUncheckedUpdateInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teachers: z
        .lazy(() => TeacherUncheckedUpdateManyWithoutSubjectsNestedInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(
          () => TableSubjectUncheckedUpdateManyWithoutSubjectNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const SubjectUpdateManyMutationInputSchema: z.ZodType<Prisma.SubjectUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubjectUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DayCreateInputSchema: z.ZodType<Prisma.DayCreateInput> = z
  .object({
    name: z.string(),
    teacherWorkDates: z
      .lazy(() => TeacherWorkDateCreateNestedManyWithoutDayInputSchema)
      .optional(),
    tableSubjects: z
      .lazy(() => TableSubjectCreateNestedManyWithoutDayInputSchema)
      .optional(),
  })
  .strict();

export const DayUncheckedCreateInputSchema: z.ZodType<Prisma.DayUncheckedCreateInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      teacherWorkDates: z
        .lazy(
          () => TeacherWorkDateUncheckedCreateNestedManyWithoutDayInputSchema,
        )
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectUncheckedCreateNestedManyWithoutDayInputSchema)
        .optional(),
    })
    .strict();

export const DayUpdateInputSchema: z.ZodType<Prisma.DayUpdateInput> = z
  .object({
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    teacherWorkDates: z
      .lazy(() => TeacherWorkDateUpdateManyWithoutDayNestedInputSchema)
      .optional(),
    tableSubjects: z
      .lazy(() => TableSubjectUpdateManyWithoutDayNestedInputSchema)
      .optional(),
  })
  .strict();

export const DayUncheckedUpdateInputSchema: z.ZodType<Prisma.DayUncheckedUpdateInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherWorkDates: z
        .lazy(
          () => TeacherWorkDateUncheckedUpdateManyWithoutDayNestedInputSchema,
        )
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectUncheckedUpdateManyWithoutDayNestedInputSchema)
        .optional(),
    })
    .strict();

export const DayUpdateManyMutationInputSchema: z.ZodType<Prisma.DayUpdateManyMutationInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DayUncheckedUpdateManyInputSchema: z.ZodType<Prisma.DayUncheckedUpdateManyInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> = z
  .object({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })
  .strict();

export const MajorRelationFilterSchema: z.ZodType<Prisma.MajorRelationFilter> =
  z
    .object({
      is: z.lazy(() => MajorWhereInputSchema).optional(),
      isNot: z.lazy(() => MajorWhereInputSchema).optional(),
    })
    .strict();

export const TableSubjectListRelationFilterSchema: z.ZodType<Prisma.TableSubjectListRelationFilter> =
  z
    .object({
      every: z.lazy(() => TableSubjectWhereInputSchema).optional(),
      some: z.lazy(() => TableSubjectWhereInputSchema).optional(),
      none: z.lazy(() => TableSubjectWhereInputSchema).optional(),
    })
    .strict();

export const TableSubjectOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TableSubjectOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TableCountOrderByAggregateInputSchema: z.ZodType<Prisma.TableCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      level: z.lazy(() => SortOrderSchema).optional(),
      semester: z.lazy(() => SortOrderSchema).optional(),
      majorId: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TableAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TableAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      level: z.lazy(() => SortOrderSchema).optional(),
      semester: z.lazy(() => SortOrderSchema).optional(),
      majorId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TableMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TableMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      level: z.lazy(() => SortOrderSchema).optional(),
      semester: z.lazy(() => SortOrderSchema).optional(),
      majorId: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TableMinOrderByAggregateInputSchema: z.ZodType<Prisma.TableMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      level: z.lazy(() => SortOrderSchema).optional(),
      semester: z.lazy(() => SortOrderSchema).optional(),
      majorId: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TableSumOrderByAggregateInputSchema: z.ZodType<Prisma.TableSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      level: z.lazy(() => SortOrderSchema).optional(),
      semester: z.lazy(() => SortOrderSchema).optional(),
      majorId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const TableRelationFilterSchema: z.ZodType<Prisma.TableRelationFilter> =
  z
    .object({
      is: z.lazy(() => TableWhereInputSchema).optional(),
      isNot: z.lazy(() => TableWhereInputSchema).optional(),
    })
    .strict();

export const DayRelationFilterSchema: z.ZodType<Prisma.DayRelationFilter> = z
  .object({
    is: z.lazy(() => DayWhereInputSchema).optional(),
    isNot: z.lazy(() => DayWhereInputSchema).optional(),
  })
  .strict();

export const SubjectRelationFilterSchema: z.ZodType<Prisma.SubjectRelationFilter> =
  z
    .object({
      is: z.lazy(() => SubjectWhereInputSchema).optional(),
      isNot: z.lazy(() => SubjectWhereInputSchema).optional(),
    })
    .strict();

export const TeacherRelationFilterSchema: z.ZodType<Prisma.TeacherRelationFilter> =
  z
    .object({
      is: z.lazy(() => TeacherWhereInputSchema).optional(),
      isNot: z.lazy(() => TeacherWhereInputSchema).optional(),
    })
    .strict();

export const HallRelationFilterSchema: z.ZodType<Prisma.HallRelationFilter> = z
  .object({
    is: z.lazy(() => HallWhereInputSchema).optional(),
    isNot: z.lazy(() => HallWhereInputSchema).optional(),
  })
  .strict();

export const TableSubjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.TableSubjectCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      tableId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
      subjectId: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      hallId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TableSubjectAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TableSubjectAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      tableId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
      subjectId: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      hallId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TableSubjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TableSubjectMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      tableId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
      subjectId: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      hallId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TableSubjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.TableSubjectMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      tableId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
      subjectId: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      hallId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TableSubjectSumOrderByAggregateInputSchema: z.ZodType<Prisma.TableSubjectSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      tableId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
      subjectId: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      hallId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedFloatWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
      _min: z.lazy(() => NestedFloatFilterSchema).optional(),
      _max: z.lazy(() => NestedFloatFilterSchema).optional(),
    })
    .strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const SubjectListRelationFilterSchema: z.ZodType<Prisma.SubjectListRelationFilter> =
  z
    .object({
      every: z.lazy(() => SubjectWhereInputSchema).optional(),
      some: z.lazy(() => SubjectWhereInputSchema).optional(),
      none: z.lazy(() => SubjectWhereInputSchema).optional(),
    })
    .strict();

export const TeacherWorkDateListRelationFilterSchema: z.ZodType<Prisma.TeacherWorkDateListRelationFilter> =
  z
    .object({
      every: z.lazy(() => TeacherWorkDateWhereInputSchema).optional(),
      some: z.lazy(() => TeacherWorkDateWhereInputSchema).optional(),
      none: z.lazy(() => TeacherWorkDateWhereInputSchema).optional(),
    })
    .strict();

export const SubjectOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SubjectOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherWorkDateOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TeacherWorkDateOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherSumOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const TeacherWorkDateCountOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherWorkDateCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherWorkDateAvgOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherWorkDateAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherWorkDateMaxOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherWorkDateMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherWorkDateMinOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherWorkDateMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherWorkDateSumOrderByAggregateInputSchema: z.ZodType<Prisma.TeacherWorkDateSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      startsAt: z.lazy(() => SortOrderSchema).optional(),
      endsAt: z.lazy(() => SortOrderSchema).optional(),
      teacherId: z.lazy(() => SortOrderSchema).optional(),
      dayId: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TableListRelationFilterSchema: z.ZodType<Prisma.TableListRelationFilter> =
  z
    .object({
      every: z.lazy(() => TableWhereInputSchema).optional(),
      some: z.lazy(() => TableWhereInputSchema).optional(),
      none: z.lazy(() => TableWhereInputSchema).optional(),
    })
    .strict();

export const TableOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TableOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MajorCountOrderByAggregateInputSchema: z.ZodType<Prisma.MajorCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MajorAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MajorAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MajorMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MajorMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MajorMinOrderByAggregateInputSchema: z.ZodType<Prisma.MajorMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MajorSumOrderByAggregateInputSchema: z.ZodType<Prisma.MajorSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      type: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HallCountOrderByAggregateInputSchema: z.ZodType<Prisma.HallCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HallAvgOrderByAggregateInputSchema: z.ZodType<Prisma.HallAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HallMaxOrderByAggregateInputSchema: z.ZodType<Prisma.HallMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HallMinOrderByAggregateInputSchema: z.ZodType<Prisma.HallMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const HallSumOrderByAggregateInputSchema: z.ZodType<Prisma.HallSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      studentsCount: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const TeacherListRelationFilterSchema: z.ZodType<Prisma.TeacherListRelationFilter> =
  z
    .object({
      every: z.lazy(() => TeacherWhereInputSchema).optional(),
      some: z.lazy(() => TeacherWhereInputSchema).optional(),
      none: z.lazy(() => TeacherWhereInputSchema).optional(),
    })
    .strict();

export const TeacherOrderByRelationAggregateInputSchema: z.ZodType<Prisma.TeacherOrderByRelationAggregateInput> =
  z
    .object({
      _count: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubjectCountOrderByAggregateInputSchema: z.ZodType<Prisma.SubjectCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubjectAvgOrderByAggregateInputSchema: z.ZodType<Prisma.SubjectAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubjectMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SubjectMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubjectMinOrderByAggregateInputSchema: z.ZodType<Prisma.SubjectMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
      updatedAt: z.lazy(() => SortOrderSchema).optional(),
      createdAt: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const SubjectSumOrderByAggregateInputSchema: z.ZodType<Prisma.SubjectSumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DayCountOrderByAggregateInputSchema: z.ZodType<Prisma.DayCountOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DayAvgOrderByAggregateInputSchema: z.ZodType<Prisma.DayAvgOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DayMaxOrderByAggregateInputSchema: z.ZodType<Prisma.DayMaxOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DayMinOrderByAggregateInputSchema: z.ZodType<Prisma.DayMinOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
      name: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const DaySumOrderByAggregateInputSchema: z.ZodType<Prisma.DaySumOrderByAggregateInput> =
  z
    .object({
      id: z.lazy(() => SortOrderSchema).optional(),
    })
    .strict();

export const MajorCreateNestedOneWithoutTablesInputSchema: z.ZodType<Prisma.MajorCreateNestedOneWithoutTablesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MajorCreateWithoutTablesInputSchema),
          z.lazy(() => MajorUncheckedCreateWithoutTablesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MajorCreateOrConnectWithoutTablesInputSchema)
        .optional(),
      connect: z.lazy(() => MajorWhereUniqueInputSchema).optional(),
    })
    .strict();

export const TableSubjectCreateNestedManyWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectCreateNestedManyWithoutTableInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutTableInputSchema),
          z.lazy(() => TableSubjectCreateWithoutTableInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutTableInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutTableInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutTableInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutTableInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedCreateNestedManyWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateNestedManyWithoutTableInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutTableInputSchema),
          z.lazy(() => TableSubjectCreateWithoutTableInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutTableInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutTableInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutTableInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutTableInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z
    .object({
      set: z.coerce.date().optional(),
    })
    .strict();

export const MajorUpdateOneRequiredWithoutTablesNestedInputSchema: z.ZodType<Prisma.MajorUpdateOneRequiredWithoutTablesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => MajorCreateWithoutTablesInputSchema),
          z.lazy(() => MajorUncheckedCreateWithoutTablesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => MajorCreateOrConnectWithoutTablesInputSchema)
        .optional(),
      upsert: z.lazy(() => MajorUpsertWithoutTablesInputSchema).optional(),
      connect: z.lazy(() => MajorWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => MajorUpdateToOneWithWhereWithoutTablesInputSchema),
          z.lazy(() => MajorUpdateWithoutTablesInputSchema),
          z.lazy(() => MajorUncheckedUpdateWithoutTablesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpdateManyWithoutTableNestedInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyWithoutTableNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutTableInputSchema),
          z.lazy(() => TableSubjectCreateWithoutTableInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutTableInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutTableInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutTableInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutTableInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => TableSubjectUpsertWithWhereUniqueWithoutTableInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpsertWithWhereUniqueWithoutTableInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => TableSubjectUpdateWithWhereUniqueWithoutTableInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpdateWithWhereUniqueWithoutTableInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TableSubjectUpdateManyWithWhereWithoutTableInputSchema),
          z
            .lazy(() => TableSubjectUpdateManyWithWhereWithoutTableInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyWithoutTableNestedInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyWithoutTableNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutTableInputSchema),
          z.lazy(() => TableSubjectCreateWithoutTableInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutTableInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutTableInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutTableInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutTableInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => TableSubjectUpsertWithWhereUniqueWithoutTableInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpsertWithWhereUniqueWithoutTableInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => TableSubjectUpdateWithWhereUniqueWithoutTableInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpdateWithWhereUniqueWithoutTableInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TableSubjectUpdateManyWithWhereWithoutTableInputSchema),
          z
            .lazy(() => TableSubjectUpdateManyWithWhereWithoutTableInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableCreateNestedOneWithoutSubjectsInputSchema: z.ZodType<Prisma.TableCreateNestedOneWithoutSubjectsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableCreateWithoutSubjectsInputSchema),
          z.lazy(() => TableUncheckedCreateWithoutSubjectsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TableCreateOrConnectWithoutSubjectsInputSchema)
        .optional(),
      connect: z.lazy(() => TableWhereUniqueInputSchema).optional(),
    })
    .strict();

export const DayCreateNestedOneWithoutTableSubjectsInputSchema: z.ZodType<Prisma.DayCreateNestedOneWithoutTableSubjectsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DayCreateWithoutTableSubjectsInputSchema),
          z.lazy(() => DayUncheckedCreateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DayCreateOrConnectWithoutTableSubjectsInputSchema)
        .optional(),
      connect: z.lazy(() => DayWhereUniqueInputSchema).optional(),
    })
    .strict();

export const SubjectCreateNestedOneWithoutTableSubjectsInputSchema: z.ZodType<Prisma.SubjectCreateNestedOneWithoutTableSubjectsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SubjectCreateWithoutTableSubjectsInputSchema),
          z.lazy(() => SubjectUncheckedCreateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => SubjectCreateOrConnectWithoutTableSubjectsInputSchema)
        .optional(),
      connect: z.lazy(() => SubjectWhereUniqueInputSchema).optional(),
    })
    .strict();

export const TeacherCreateNestedOneWithoutTableSubjectsInputSchema: z.ZodType<Prisma.TeacherCreateNestedOneWithoutTableSubjectsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherCreateWithoutTableSubjectsInputSchema),
          z.lazy(() => TeacherUncheckedCreateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TeacherCreateOrConnectWithoutTableSubjectsInputSchema)
        .optional(),
      connect: z.lazy(() => TeacherWhereUniqueInputSchema).optional(),
    })
    .strict();

export const HallCreateNestedOneWithoutTableSubjectsInputSchema: z.ZodType<Prisma.HallCreateNestedOneWithoutTableSubjectsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => HallCreateWithoutTableSubjectsInputSchema),
          z.lazy(() => HallUncheckedCreateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => HallCreateOrConnectWithoutTableSubjectsInputSchema)
        .optional(),
      connect: z.lazy(() => HallWhereUniqueInputSchema).optional(),
    })
    .strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> =
  z
    .object({
      set: z.number().optional(),
      increment: z.number().optional(),
      decrement: z.number().optional(),
      multiply: z.number().optional(),
      divide: z.number().optional(),
    })
    .strict();

export const TableUpdateOneRequiredWithoutSubjectsNestedInputSchema: z.ZodType<Prisma.TableUpdateOneRequiredWithoutSubjectsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableCreateWithoutSubjectsInputSchema),
          z.lazy(() => TableUncheckedCreateWithoutSubjectsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TableCreateOrConnectWithoutSubjectsInputSchema)
        .optional(),
      upsert: z.lazy(() => TableUpsertWithoutSubjectsInputSchema).optional(),
      connect: z.lazy(() => TableWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => TableUpdateToOneWithWhereWithoutSubjectsInputSchema),
          z.lazy(() => TableUpdateWithoutSubjectsInputSchema),
          z.lazy(() => TableUncheckedUpdateWithoutSubjectsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DayUpdateOneRequiredWithoutTableSubjectsNestedInputSchema: z.ZodType<Prisma.DayUpdateOneRequiredWithoutTableSubjectsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DayCreateWithoutTableSubjectsInputSchema),
          z.lazy(() => DayUncheckedCreateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DayCreateOrConnectWithoutTableSubjectsInputSchema)
        .optional(),
      upsert: z.lazy(() => DayUpsertWithoutTableSubjectsInputSchema).optional(),
      connect: z.lazy(() => DayWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => DayUpdateToOneWithWhereWithoutTableSubjectsInputSchema),
          z.lazy(() => DayUpdateWithoutTableSubjectsInputSchema),
          z.lazy(() => DayUncheckedUpdateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubjectUpdateOneRequiredWithoutTableSubjectsNestedInputSchema: z.ZodType<Prisma.SubjectUpdateOneRequiredWithoutTableSubjectsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SubjectCreateWithoutTableSubjectsInputSchema),
          z.lazy(() => SubjectUncheckedCreateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => SubjectCreateOrConnectWithoutTableSubjectsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => SubjectUpsertWithoutTableSubjectsInputSchema)
        .optional(),
      connect: z.lazy(() => SubjectWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => SubjectUpdateToOneWithWhereWithoutTableSubjectsInputSchema,
          ),
          z.lazy(() => SubjectUpdateWithoutTableSubjectsInputSchema),
          z.lazy(() => SubjectUncheckedUpdateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherUpdateOneRequiredWithoutTableSubjectsNestedInputSchema: z.ZodType<Prisma.TeacherUpdateOneRequiredWithoutTableSubjectsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherCreateWithoutTableSubjectsInputSchema),
          z.lazy(() => TeacherUncheckedCreateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TeacherCreateOrConnectWithoutTableSubjectsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => TeacherUpsertWithoutTableSubjectsInputSchema)
        .optional(),
      connect: z.lazy(() => TeacherWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => TeacherUpdateToOneWithWhereWithoutTableSubjectsInputSchema,
          ),
          z.lazy(() => TeacherUpdateWithoutTableSubjectsInputSchema),
          z.lazy(() => TeacherUncheckedUpdateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HallUpdateOneRequiredWithoutTableSubjectsNestedInputSchema: z.ZodType<Prisma.HallUpdateOneRequiredWithoutTableSubjectsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => HallCreateWithoutTableSubjectsInputSchema),
          z.lazy(() => HallUncheckedCreateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => HallCreateOrConnectWithoutTableSubjectsInputSchema)
        .optional(),
      upsert: z
        .lazy(() => HallUpsertWithoutTableSubjectsInputSchema)
        .optional(),
      connect: z.lazy(() => HallWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => HallUpdateToOneWithWhereWithoutTableSubjectsInputSchema),
          z.lazy(() => HallUpdateWithoutTableSubjectsInputSchema),
          z.lazy(() => HallUncheckedUpdateWithoutTableSubjectsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubjectCreateNestedManyWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectCreateNestedManyWithoutTeachersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
          z.lazy(() => SubjectCreateWithoutTeachersInputSchema).array(),
          z.lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SubjectCreateOrConnectWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectCreateOrConnectWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SubjectWhereUniqueInputSchema),
          z.lazy(() => SubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateCreateNestedManyWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateCreateNestedManyWithoutTeacherInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherWorkDateCreateWithoutTeacherInputSchema),
          z.lazy(() => TeacherWorkDateCreateWithoutTeacherInputSchema).array(),
          z.lazy(() => TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema),
          z
            .lazy(() => TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherWorkDateCreateOrConnectWithoutTeacherInputSchema),
          z
            .lazy(() => TeacherWorkDateCreateOrConnectWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectCreateNestedManyWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectCreateNestedManyWithoutTeacherInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutTeacherInputSchema),
          z.lazy(() => TableSubjectCreateWithoutTeacherInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutTeacherInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutTeacherInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SubjectUncheckedCreateNestedManyWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUncheckedCreateNestedManyWithoutTeachersInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
          z.lazy(() => SubjectCreateWithoutTeachersInputSchema).array(),
          z.lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SubjectCreateOrConnectWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectCreateOrConnectWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SubjectWhereUniqueInputSchema),
          z.lazy(() => SubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUncheckedCreateNestedManyWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedCreateNestedManyWithoutTeacherInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherWorkDateCreateWithoutTeacherInputSchema),
          z.lazy(() => TeacherWorkDateCreateWithoutTeacherInputSchema).array(),
          z.lazy(() => TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema),
          z
            .lazy(() => TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherWorkDateCreateOrConnectWithoutTeacherInputSchema),
          z
            .lazy(() => TeacherWorkDateCreateOrConnectWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedCreateNestedManyWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateNestedManyWithoutTeacherInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutTeacherInputSchema),
          z.lazy(() => TableSubjectCreateWithoutTeacherInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutTeacherInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutTeacherInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z
    .object({
      set: z.string().optional(),
    })
    .strict();

export const SubjectUpdateManyWithoutTeachersNestedInputSchema: z.ZodType<Prisma.SubjectUpdateManyWithoutTeachersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
          z.lazy(() => SubjectCreateWithoutTeachersInputSchema).array(),
          z.lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SubjectCreateOrConnectWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectCreateOrConnectWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SubjectUpsertWithWhereUniqueWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectUpsertWithWhereUniqueWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => SubjectWhereUniqueInputSchema),
          z.lazy(() => SubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SubjectWhereUniqueInputSchema),
          z.lazy(() => SubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SubjectWhereUniqueInputSchema),
          z.lazy(() => SubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SubjectWhereUniqueInputSchema),
          z.lazy(() => SubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SubjectUpdateWithWhereUniqueWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectUpdateWithWhereUniqueWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SubjectUpdateManyWithWhereWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectUpdateManyWithWhereWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SubjectScalarWhereInputSchema),
          z.lazy(() => SubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUpdateManyWithoutTeacherNestedInputSchema: z.ZodType<Prisma.TeacherWorkDateUpdateManyWithoutTeacherNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherWorkDateCreateWithoutTeacherInputSchema),
          z.lazy(() => TeacherWorkDateCreateWithoutTeacherInputSchema).array(),
          z.lazy(() => TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema),
          z
            .lazy(() => TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherWorkDateCreateOrConnectWithoutTeacherInputSchema),
          z
            .lazy(() => TeacherWorkDateCreateOrConnectWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => TeacherWorkDateUpsertWithWhereUniqueWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () =>
                TeacherWorkDateUpsertWithWhereUniqueWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => TeacherWorkDateUpdateWithWhereUniqueWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () =>
                TeacherWorkDateUpdateWithWhereUniqueWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => TeacherWorkDateUpdateManyWithWhereWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () => TeacherWorkDateUpdateManyWithWhereWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema),
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpdateManyWithoutTeacherNestedInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyWithoutTeacherNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutTeacherInputSchema),
          z.lazy(() => TableSubjectCreateWithoutTeacherInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutTeacherInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutTeacherInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => TableSubjectUpsertWithWhereUniqueWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpsertWithWhereUniqueWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => TableSubjectUpdateWithWhereUniqueWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpdateWithWhereUniqueWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => TableSubjectUpdateManyWithWhereWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpdateManyWithWhereWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const SubjectUncheckedUpdateManyWithoutTeachersNestedInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateManyWithoutTeachersNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
          z.lazy(() => SubjectCreateWithoutTeachersInputSchema).array(),
          z.lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => SubjectCreateOrConnectWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectCreateOrConnectWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => SubjectUpsertWithWhereUniqueWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectUpsertWithWhereUniqueWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => SubjectWhereUniqueInputSchema),
          z.lazy(() => SubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => SubjectWhereUniqueInputSchema),
          z.lazy(() => SubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => SubjectWhereUniqueInputSchema),
          z.lazy(() => SubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => SubjectWhereUniqueInputSchema),
          z.lazy(() => SubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => SubjectUpdateWithWhereUniqueWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectUpdateWithWhereUniqueWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => SubjectUpdateManyWithWhereWithoutTeachersInputSchema),
          z
            .lazy(() => SubjectUpdateManyWithWhereWithoutTeachersInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => SubjectScalarWhereInputSchema),
          z.lazy(() => SubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUncheckedUpdateManyWithoutTeacherNestedInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedUpdateManyWithoutTeacherNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherWorkDateCreateWithoutTeacherInputSchema),
          z.lazy(() => TeacherWorkDateCreateWithoutTeacherInputSchema).array(),
          z.lazy(() => TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema),
          z
            .lazy(() => TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherWorkDateCreateOrConnectWithoutTeacherInputSchema),
          z
            .lazy(() => TeacherWorkDateCreateOrConnectWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => TeacherWorkDateUpsertWithWhereUniqueWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () =>
                TeacherWorkDateUpsertWithWhereUniqueWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => TeacherWorkDateUpdateWithWhereUniqueWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () =>
                TeacherWorkDateUpdateWithWhereUniqueWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => TeacherWorkDateUpdateManyWithWhereWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () => TeacherWorkDateUpdateManyWithWhereWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema),
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyWithoutTeacherNestedInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyWithoutTeacherNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutTeacherInputSchema),
          z.lazy(() => TableSubjectCreateWithoutTeacherInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutTeacherInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutTeacherInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutTeacherInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => TableSubjectUpsertWithWhereUniqueWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpsertWithWhereUniqueWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => TableSubjectUpdateWithWhereUniqueWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpdateWithWhereUniqueWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => TableSubjectUpdateManyWithWhereWithoutTeacherInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpdateManyWithWhereWithoutTeacherInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const DayCreateNestedOneWithoutTeacherWorkDatesInputSchema: z.ZodType<Prisma.DayCreateNestedOneWithoutTeacherWorkDatesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DayCreateWithoutTeacherWorkDatesInputSchema),
          z.lazy(() => DayUncheckedCreateWithoutTeacherWorkDatesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DayCreateOrConnectWithoutTeacherWorkDatesInputSchema)
        .optional(),
      connect: z.lazy(() => DayWhereUniqueInputSchema).optional(),
    })
    .strict();

export const TeacherCreateNestedOneWithoutWorkDatesInputSchema: z.ZodType<Prisma.TeacherCreateNestedOneWithoutWorkDatesInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherCreateWithoutWorkDatesInputSchema),
          z.lazy(() => TeacherUncheckedCreateWithoutWorkDatesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TeacherCreateOrConnectWithoutWorkDatesInputSchema)
        .optional(),
      connect: z.lazy(() => TeacherWhereUniqueInputSchema).optional(),
    })
    .strict();

export const DayUpdateOneRequiredWithoutTeacherWorkDatesNestedInputSchema: z.ZodType<Prisma.DayUpdateOneRequiredWithoutTeacherWorkDatesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => DayCreateWithoutTeacherWorkDatesInputSchema),
          z.lazy(() => DayUncheckedCreateWithoutTeacherWorkDatesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => DayCreateOrConnectWithoutTeacherWorkDatesInputSchema)
        .optional(),
      upsert: z
        .lazy(() => DayUpsertWithoutTeacherWorkDatesInputSchema)
        .optional(),
      connect: z.lazy(() => DayWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(
            () => DayUpdateToOneWithWhereWithoutTeacherWorkDatesInputSchema,
          ),
          z.lazy(() => DayUpdateWithoutTeacherWorkDatesInputSchema),
          z.lazy(() => DayUncheckedUpdateWithoutTeacherWorkDatesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherUpdateOneRequiredWithoutWorkDatesNestedInputSchema: z.ZodType<Prisma.TeacherUpdateOneRequiredWithoutWorkDatesNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherCreateWithoutWorkDatesInputSchema),
          z.lazy(() => TeacherUncheckedCreateWithoutWorkDatesInputSchema),
        ])
        .optional(),
      connectOrCreate: z
        .lazy(() => TeacherCreateOrConnectWithoutWorkDatesInputSchema)
        .optional(),
      upsert: z.lazy(() => TeacherUpsertWithoutWorkDatesInputSchema).optional(),
      connect: z.lazy(() => TeacherWhereUniqueInputSchema).optional(),
      update: z
        .union([
          z.lazy(() => TeacherUpdateToOneWithWhereWithoutWorkDatesInputSchema),
          z.lazy(() => TeacherUpdateWithoutWorkDatesInputSchema),
          z.lazy(() => TeacherUncheckedUpdateWithoutWorkDatesInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableCreateNestedManyWithoutMajorInputSchema: z.ZodType<Prisma.TableCreateNestedManyWithoutMajorInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableCreateWithoutMajorInputSchema),
          z.lazy(() => TableCreateWithoutMajorInputSchema).array(),
          z.lazy(() => TableUncheckedCreateWithoutMajorInputSchema),
          z.lazy(() => TableUncheckedCreateWithoutMajorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableCreateOrConnectWithoutMajorInputSchema),
          z.lazy(() => TableCreateOrConnectWithoutMajorInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableWhereUniqueInputSchema),
          z.lazy(() => TableWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableUncheckedCreateNestedManyWithoutMajorInputSchema: z.ZodType<Prisma.TableUncheckedCreateNestedManyWithoutMajorInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableCreateWithoutMajorInputSchema),
          z.lazy(() => TableCreateWithoutMajorInputSchema).array(),
          z.lazy(() => TableUncheckedCreateWithoutMajorInputSchema),
          z.lazy(() => TableUncheckedCreateWithoutMajorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableCreateOrConnectWithoutMajorInputSchema),
          z.lazy(() => TableCreateOrConnectWithoutMajorInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableWhereUniqueInputSchema),
          z.lazy(() => TableWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableUpdateManyWithoutMajorNestedInputSchema: z.ZodType<Prisma.TableUpdateManyWithoutMajorNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableCreateWithoutMajorInputSchema),
          z.lazy(() => TableCreateWithoutMajorInputSchema).array(),
          z.lazy(() => TableUncheckedCreateWithoutMajorInputSchema),
          z.lazy(() => TableUncheckedCreateWithoutMajorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableCreateOrConnectWithoutMajorInputSchema),
          z.lazy(() => TableCreateOrConnectWithoutMajorInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TableUpsertWithWhereUniqueWithoutMajorInputSchema),
          z
            .lazy(() => TableUpsertWithWhereUniqueWithoutMajorInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableWhereUniqueInputSchema),
          z.lazy(() => TableWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableWhereUniqueInputSchema),
          z.lazy(() => TableWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableWhereUniqueInputSchema),
          z.lazy(() => TableWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableWhereUniqueInputSchema),
          z.lazy(() => TableWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TableUpdateWithWhereUniqueWithoutMajorInputSchema),
          z
            .lazy(() => TableUpdateWithWhereUniqueWithoutMajorInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TableUpdateManyWithWhereWithoutMajorInputSchema),
          z.lazy(() => TableUpdateManyWithWhereWithoutMajorInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableScalarWhereInputSchema),
          z.lazy(() => TableScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableUncheckedUpdateManyWithoutMajorNestedInputSchema: z.ZodType<Prisma.TableUncheckedUpdateManyWithoutMajorNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableCreateWithoutMajorInputSchema),
          z.lazy(() => TableCreateWithoutMajorInputSchema).array(),
          z.lazy(() => TableUncheckedCreateWithoutMajorInputSchema),
          z.lazy(() => TableUncheckedCreateWithoutMajorInputSchema).array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableCreateOrConnectWithoutMajorInputSchema),
          z.lazy(() => TableCreateOrConnectWithoutMajorInputSchema).array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TableUpsertWithWhereUniqueWithoutMajorInputSchema),
          z
            .lazy(() => TableUpsertWithWhereUniqueWithoutMajorInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableWhereUniqueInputSchema),
          z.lazy(() => TableWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableWhereUniqueInputSchema),
          z.lazy(() => TableWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableWhereUniqueInputSchema),
          z.lazy(() => TableWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableWhereUniqueInputSchema),
          z.lazy(() => TableWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TableUpdateWithWhereUniqueWithoutMajorInputSchema),
          z
            .lazy(() => TableUpdateWithWhereUniqueWithoutMajorInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TableUpdateManyWithWhereWithoutMajorInputSchema),
          z.lazy(() => TableUpdateManyWithWhereWithoutMajorInputSchema).array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableScalarWhereInputSchema),
          z.lazy(() => TableScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectCreateNestedManyWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectCreateNestedManyWithoutHallInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutHallInputSchema),
          z.lazy(() => TableSubjectCreateWithoutHallInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedCreateNestedManyWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateNestedManyWithoutHallInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutHallInputSchema),
          z.lazy(() => TableSubjectCreateWithoutHallInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpdateManyWithoutHallNestedInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyWithoutHallNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutHallInputSchema),
          z.lazy(() => TableSubjectCreateWithoutHallInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TableSubjectUpsertWithWhereUniqueWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectUpsertWithWhereUniqueWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TableSubjectUpdateWithWhereUniqueWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectUpdateWithWhereUniqueWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TableSubjectUpdateManyWithWhereWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectUpdateManyWithWhereWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyWithoutHallNestedInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyWithoutHallNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutHallInputSchema),
          z.lazy(() => TableSubjectCreateWithoutHallInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TableSubjectUpsertWithWhereUniqueWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectUpsertWithWhereUniqueWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TableSubjectUpdateWithWhereUniqueWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectUpdateWithWhereUniqueWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TableSubjectUpdateManyWithWhereWithoutHallInputSchema),
          z
            .lazy(() => TableSubjectUpdateManyWithWhereWithoutHallInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherCreateNestedManyWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherCreateNestedManyWithoutSubjectsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
          z.lazy(() => TeacherCreateWithoutSubjectsInputSchema).array(),
          z.lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherCreateOrConnectWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherCreateOrConnectWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWhereUniqueInputSchema),
          z.lazy(() => TeacherWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectCreateNestedManyWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectCreateNestedManyWithoutSubjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutSubjectInputSchema),
          z.lazy(() => TableSubjectCreateWithoutSubjectInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutSubjectInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutSubjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutSubjectInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutSubjectInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherUncheckedCreateNestedManyWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateNestedManyWithoutSubjectsInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
          z.lazy(() => TeacherCreateWithoutSubjectsInputSchema).array(),
          z.lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherCreateOrConnectWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherCreateOrConnectWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWhereUniqueInputSchema),
          z.lazy(() => TeacherWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedCreateNestedManyWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateNestedManyWithoutSubjectInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutSubjectInputSchema),
          z.lazy(() => TableSubjectCreateWithoutSubjectInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutSubjectInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutSubjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutSubjectInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutSubjectInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherUpdateManyWithoutSubjectsNestedInputSchema: z.ZodType<Prisma.TeacherUpdateManyWithoutSubjectsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
          z.lazy(() => TeacherCreateWithoutSubjectsInputSchema).array(),
          z.lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherCreateOrConnectWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherCreateOrConnectWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TeacherUpsertWithWhereUniqueWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherUpsertWithWhereUniqueWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TeacherWhereUniqueInputSchema),
          z.lazy(() => TeacherWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TeacherWhereUniqueInputSchema),
          z.lazy(() => TeacherWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TeacherWhereUniqueInputSchema),
          z.lazy(() => TeacherWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWhereUniqueInputSchema),
          z.lazy(() => TeacherWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TeacherUpdateWithWhereUniqueWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherUpdateWithWhereUniqueWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TeacherUpdateManyWithWhereWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherUpdateManyWithWhereWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TeacherScalarWhereInputSchema),
          z.lazy(() => TeacherScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpdateManyWithoutSubjectNestedInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyWithoutSubjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutSubjectInputSchema),
          z.lazy(() => TableSubjectCreateWithoutSubjectInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutSubjectInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutSubjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutSubjectInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutSubjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => TableSubjectUpsertWithWhereUniqueWithoutSubjectInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpsertWithWhereUniqueWithoutSubjectInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => TableSubjectUpdateWithWhereUniqueWithoutSubjectInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpdateWithWhereUniqueWithoutSubjectInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => TableSubjectUpdateManyWithWhereWithoutSubjectInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpdateManyWithWhereWithoutSubjectInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherUncheckedUpdateManyWithoutSubjectsNestedInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateManyWithoutSubjectsNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
          z.lazy(() => TeacherCreateWithoutSubjectsInputSchema).array(),
          z.lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherCreateOrConnectWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherCreateOrConnectWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TeacherUpsertWithWhereUniqueWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherUpsertWithWhereUniqueWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TeacherWhereUniqueInputSchema),
          z.lazy(() => TeacherWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TeacherWhereUniqueInputSchema),
          z.lazy(() => TeacherWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TeacherWhereUniqueInputSchema),
          z.lazy(() => TeacherWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWhereUniqueInputSchema),
          z.lazy(() => TeacherWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TeacherUpdateWithWhereUniqueWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherUpdateWithWhereUniqueWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TeacherUpdateManyWithWhereWithoutSubjectsInputSchema),
          z
            .lazy(() => TeacherUpdateManyWithWhereWithoutSubjectsInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TeacherScalarWhereInputSchema),
          z.lazy(() => TeacherScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyWithoutSubjectNestedInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyWithoutSubjectNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutSubjectInputSchema),
          z.lazy(() => TableSubjectCreateWithoutSubjectInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutSubjectInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutSubjectInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutSubjectInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutSubjectInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => TableSubjectUpsertWithWhereUniqueWithoutSubjectInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpsertWithWhereUniqueWithoutSubjectInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => TableSubjectUpdateWithWhereUniqueWithoutSubjectInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpdateWithWhereUniqueWithoutSubjectInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(
            () => TableSubjectUpdateManyWithWhereWithoutSubjectInputSchema,
          ),
          z
            .lazy(
              () => TableSubjectUpdateManyWithWhereWithoutSubjectInputSchema,
            )
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateCreateNestedManyWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateCreateNestedManyWithoutDayInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherWorkDateCreateWithoutDayInputSchema),
          z.lazy(() => TeacherWorkDateCreateWithoutDayInputSchema).array(),
          z.lazy(() => TeacherWorkDateUncheckedCreateWithoutDayInputSchema),
          z
            .lazy(() => TeacherWorkDateUncheckedCreateWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherWorkDateCreateOrConnectWithoutDayInputSchema),
          z
            .lazy(() => TeacherWorkDateCreateOrConnectWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectCreateNestedManyWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectCreateNestedManyWithoutDayInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutDayInputSchema),
          z.lazy(() => TableSubjectCreateWithoutDayInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUncheckedCreateNestedManyWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedCreateNestedManyWithoutDayInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherWorkDateCreateWithoutDayInputSchema),
          z.lazy(() => TeacherWorkDateCreateWithoutDayInputSchema).array(),
          z.lazy(() => TeacherWorkDateUncheckedCreateWithoutDayInputSchema),
          z
            .lazy(() => TeacherWorkDateUncheckedCreateWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherWorkDateCreateOrConnectWithoutDayInputSchema),
          z
            .lazy(() => TeacherWorkDateCreateOrConnectWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedCreateNestedManyWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateNestedManyWithoutDayInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutDayInputSchema),
          z.lazy(() => TableSubjectCreateWithoutDayInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUpdateManyWithoutDayNestedInputSchema: z.ZodType<Prisma.TeacherWorkDateUpdateManyWithoutDayNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherWorkDateCreateWithoutDayInputSchema),
          z.lazy(() => TeacherWorkDateCreateWithoutDayInputSchema).array(),
          z.lazy(() => TeacherWorkDateUncheckedCreateWithoutDayInputSchema),
          z
            .lazy(() => TeacherWorkDateUncheckedCreateWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherWorkDateCreateOrConnectWithoutDayInputSchema),
          z
            .lazy(() => TeacherWorkDateCreateOrConnectWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => TeacherWorkDateUpsertWithWhereUniqueWithoutDayInputSchema,
          ),
          z
            .lazy(
              () => TeacherWorkDateUpsertWithWhereUniqueWithoutDayInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => TeacherWorkDateUpdateWithWhereUniqueWithoutDayInputSchema,
          ),
          z
            .lazy(
              () => TeacherWorkDateUpdateWithWhereUniqueWithoutDayInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TeacherWorkDateUpdateManyWithWhereWithoutDayInputSchema),
          z
            .lazy(() => TeacherWorkDateUpdateManyWithWhereWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema),
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpdateManyWithoutDayNestedInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyWithoutDayNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutDayInputSchema),
          z.lazy(() => TableSubjectCreateWithoutDayInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TableSubjectUpsertWithWhereUniqueWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectUpsertWithWhereUniqueWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TableSubjectUpdateWithWhereUniqueWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectUpdateWithWhereUniqueWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TableSubjectUpdateManyWithWhereWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectUpdateManyWithWhereWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUncheckedUpdateManyWithoutDayNestedInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedUpdateManyWithoutDayNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TeacherWorkDateCreateWithoutDayInputSchema),
          z.lazy(() => TeacherWorkDateCreateWithoutDayInputSchema).array(),
          z.lazy(() => TeacherWorkDateUncheckedCreateWithoutDayInputSchema),
          z
            .lazy(() => TeacherWorkDateUncheckedCreateWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TeacherWorkDateCreateOrConnectWithoutDayInputSchema),
          z
            .lazy(() => TeacherWorkDateCreateOrConnectWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(
            () => TeacherWorkDateUpsertWithWhereUniqueWithoutDayInputSchema,
          ),
          z
            .lazy(
              () => TeacherWorkDateUpsertWithWhereUniqueWithoutDayInputSchema,
            )
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
          z.lazy(() => TeacherWorkDateWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(
            () => TeacherWorkDateUpdateWithWhereUniqueWithoutDayInputSchema,
          ),
          z
            .lazy(
              () => TeacherWorkDateUpdateWithWhereUniqueWithoutDayInputSchema,
            )
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TeacherWorkDateUpdateManyWithWhereWithoutDayInputSchema),
          z
            .lazy(() => TeacherWorkDateUpdateManyWithWhereWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema),
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyWithoutDayNestedInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyWithoutDayNestedInput> =
  z
    .object({
      create: z
        .union([
          z.lazy(() => TableSubjectCreateWithoutDayInputSchema),
          z.lazy(() => TableSubjectCreateWithoutDayInputSchema).array(),
          z.lazy(() => TableSubjectUncheckedCreateWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectUncheckedCreateWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      connectOrCreate: z
        .union([
          z.lazy(() => TableSubjectCreateOrConnectWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectCreateOrConnectWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      upsert: z
        .union([
          z.lazy(() => TableSubjectUpsertWithWhereUniqueWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectUpsertWithWhereUniqueWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      set: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      disconnect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      delete: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      connect: z
        .union([
          z.lazy(() => TableSubjectWhereUniqueInputSchema),
          z.lazy(() => TableSubjectWhereUniqueInputSchema).array(),
        ])
        .optional(),
      update: z
        .union([
          z.lazy(() => TableSubjectUpdateWithWhereUniqueWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectUpdateWithWhereUniqueWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      updateMany: z
        .union([
          z.lazy(() => TableSubjectUpdateManyWithWhereWithoutDayInputSchema),
          z
            .lazy(() => TableSubjectUpdateManyWithWhereWithoutDayInputSchema)
            .array(),
        ])
        .optional(),
      deleteMany: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
    })
    .strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })
  .strict();

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
        .optional(),
    })
    .strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([z.number(), z.lazy(() => NestedIntWithAggregatesFilterSchema)])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedIntFilterSchema).optional(),
      _max: z.lazy(() => NestedIntFilterSchema).optional(),
    })
    .strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z
  .object({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedFloatFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z
    .object({
      equals: z.coerce.date().optional(),
      in: z.coerce.date().array().optional(),
      notIn: z.coerce.date().array().optional(),
      lt: z.coerce.date().optional(),
      lte: z.coerce.date().optional(),
      gt: z.coerce.date().optional(),
      gte: z.coerce.date().optional(),
      not: z
        .union([
          z.coerce.date(),
          z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
      _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    })
    .strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> =
  z
    .object({
      equals: z.number().optional(),
      in: z.number().array().optional(),
      notIn: z.number().array().optional(),
      lt: z.number().optional(),
      lte: z.number().optional(),
      gt: z.number().optional(),
      gte: z.number().optional(),
      not: z
        .union([
          z.number(),
          z.lazy(() => NestedFloatWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
      _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
      _min: z.lazy(() => NestedFloatFilterSchema).optional(),
      _max: z.lazy(() => NestedFloatFilterSchema).optional(),
    })
    .strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z
  .object({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })
  .strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z
    .object({
      equals: z.string().optional(),
      in: z.string().array().optional(),
      notIn: z.string().array().optional(),
      lt: z.string().optional(),
      lte: z.string().optional(),
      gt: z.string().optional(),
      gte: z.string().optional(),
      contains: z.string().optional(),
      startsWith: z.string().optional(),
      endsWith: z.string().optional(),
      not: z
        .union([
          z.string(),
          z.lazy(() => NestedStringWithAggregatesFilterSchema),
        ])
        .optional(),
      _count: z.lazy(() => NestedIntFilterSchema).optional(),
      _min: z.lazy(() => NestedStringFilterSchema).optional(),
      _max: z.lazy(() => NestedStringFilterSchema).optional(),
    })
    .strict();

export const MajorCreateWithoutTablesInputSchema: z.ZodType<Prisma.MajorCreateWithoutTablesInput> =
  z
    .object({
      type: z.number().int().optional(),
      name: z.string(),
      studentsCount: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const MajorUncheckedCreateWithoutTablesInputSchema: z.ZodType<Prisma.MajorUncheckedCreateWithoutTablesInput> =
  z
    .object({
      id: z.number().int().optional(),
      type: z.number().int().optional(),
      name: z.string(),
      studentsCount: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const MajorCreateOrConnectWithoutTablesInputSchema: z.ZodType<Prisma.MajorCreateOrConnectWithoutTablesInput> =
  z
    .object({
      where: z.lazy(() => MajorWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => MajorCreateWithoutTablesInputSchema),
        z.lazy(() => MajorUncheckedCreateWithoutTablesInputSchema),
      ]),
    })
    .strict();

export const TableSubjectCreateWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectCreateWithoutTableInput> =
  z
    .object({
      startsAt: z.number(),
      endsAt: z.number(),
      day: z.lazy(() => DayCreateNestedOneWithoutTableSubjectsInputSchema),
      subject: z.lazy(
        () => SubjectCreateNestedOneWithoutTableSubjectsInputSchema,
      ),
      teacher: z.lazy(
        () => TeacherCreateNestedOneWithoutTableSubjectsInputSchema,
      ),
      hall: z.lazy(() => HallCreateNestedOneWithoutTableSubjectsInputSchema),
    })
    .strict();

export const TableSubjectUncheckedCreateWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateWithoutTableInput> =
  z
    .object({
      id: z.number().int().optional(),
      startsAt: z.number(),
      endsAt: z.number(),
      dayId: z.number().int(),
      subjectId: z.number().int(),
      teacherId: z.number().int(),
      hallId: z.number().int(),
    })
    .strict();

export const TableSubjectCreateOrConnectWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectCreateOrConnectWithoutTableInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TableSubjectCreateWithoutTableInputSchema),
        z.lazy(() => TableSubjectUncheckedCreateWithoutTableInputSchema),
      ]),
    })
    .strict();

export const MajorUpsertWithoutTablesInputSchema: z.ZodType<Prisma.MajorUpsertWithoutTablesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => MajorUpdateWithoutTablesInputSchema),
        z.lazy(() => MajorUncheckedUpdateWithoutTablesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => MajorCreateWithoutTablesInputSchema),
        z.lazy(() => MajorUncheckedCreateWithoutTablesInputSchema),
      ]),
      where: z.lazy(() => MajorWhereInputSchema).optional(),
    })
    .strict();

export const MajorUpdateToOneWithWhereWithoutTablesInputSchema: z.ZodType<Prisma.MajorUpdateToOneWithWhereWithoutTablesInput> =
  z
    .object({
      where: z.lazy(() => MajorWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => MajorUpdateWithoutTablesInputSchema),
        z.lazy(() => MajorUncheckedUpdateWithoutTablesInputSchema),
      ]),
    })
    .strict();

export const MajorUpdateWithoutTablesInputSchema: z.ZodType<Prisma.MajorUpdateWithoutTablesInput> =
  z
    .object({
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      studentsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const MajorUncheckedUpdateWithoutTablesInputSchema: z.ZodType<Prisma.MajorUncheckedUpdateWithoutTablesInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      studentsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpsertWithWhereUniqueWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectUpsertWithWhereUniqueWithoutTableInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TableSubjectUpdateWithoutTableInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateWithoutTableInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TableSubjectCreateWithoutTableInputSchema),
        z.lazy(() => TableSubjectUncheckedCreateWithoutTableInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateWithWhereUniqueWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectUpdateWithWhereUniqueWithoutTableInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TableSubjectUpdateWithoutTableInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateWithoutTableInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateManyWithWhereWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyWithWhereWithoutTableInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TableSubjectUpdateManyMutationInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateManyWithoutTableInputSchema),
      ]),
    })
    .strict();

export const TableSubjectScalarWhereInputSchema: z.ZodType<Prisma.TableSubjectScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TableSubjectScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TableSubjectScalarWhereInputSchema),
          z.lazy(() => TableSubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      startsAt: z
        .union([z.lazy(() => FloatFilterSchema), z.number()])
        .optional(),
      endsAt: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
      tableId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      dayId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      subjectId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      teacherId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      hallId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict();

export const TableCreateWithoutSubjectsInputSchema: z.ZodType<Prisma.TableCreateWithoutSubjectsInput> =
  z
    .object({
      type: z.number().int(),
      level: z.number().int(),
      semester: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      major: z.lazy(() => MajorCreateNestedOneWithoutTablesInputSchema),
    })
    .strict();

export const TableUncheckedCreateWithoutSubjectsInputSchema: z.ZodType<Prisma.TableUncheckedCreateWithoutSubjectsInput> =
  z
    .object({
      id: z.number().int().optional(),
      type: z.number().int(),
      level: z.number().int(),
      semester: z.number().int(),
      majorId: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const TableCreateOrConnectWithoutSubjectsInputSchema: z.ZodType<Prisma.TableCreateOrConnectWithoutSubjectsInput> =
  z
    .object({
      where: z.lazy(() => TableWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TableCreateWithoutSubjectsInputSchema),
        z.lazy(() => TableUncheckedCreateWithoutSubjectsInputSchema),
      ]),
    })
    .strict();

export const DayCreateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.DayCreateWithoutTableSubjectsInput> =
  z
    .object({
      name: z.string(),
      teacherWorkDates: z
        .lazy(() => TeacherWorkDateCreateNestedManyWithoutDayInputSchema)
        .optional(),
    })
    .strict();

export const DayUncheckedCreateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.DayUncheckedCreateWithoutTableSubjectsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      teacherWorkDates: z
        .lazy(
          () => TeacherWorkDateUncheckedCreateNestedManyWithoutDayInputSchema,
        )
        .optional(),
    })
    .strict();

export const DayCreateOrConnectWithoutTableSubjectsInputSchema: z.ZodType<Prisma.DayCreateOrConnectWithoutTableSubjectsInput> =
  z
    .object({
      where: z.lazy(() => DayWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DayCreateWithoutTableSubjectsInputSchema),
        z.lazy(() => DayUncheckedCreateWithoutTableSubjectsInputSchema),
      ]),
    })
    .strict();

export const SubjectCreateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.SubjectCreateWithoutTableSubjectsInput> =
  z
    .object({
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      teachers: z
        .lazy(() => TeacherCreateNestedManyWithoutSubjectsInputSchema)
        .optional(),
    })
    .strict();

export const SubjectUncheckedCreateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.SubjectUncheckedCreateWithoutTableSubjectsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      teachers: z
        .lazy(() => TeacherUncheckedCreateNestedManyWithoutSubjectsInputSchema)
        .optional(),
    })
    .strict();

export const SubjectCreateOrConnectWithoutTableSubjectsInputSchema: z.ZodType<Prisma.SubjectCreateOrConnectWithoutTableSubjectsInput> =
  z
    .object({
      where: z.lazy(() => SubjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SubjectCreateWithoutTableSubjectsInputSchema),
        z.lazy(() => SubjectUncheckedCreateWithoutTableSubjectsInputSchema),
      ]),
    })
    .strict();

export const TeacherCreateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.TeacherCreateWithoutTableSubjectsInput> =
  z
    .object({
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      subjects: z
        .lazy(() => SubjectCreateNestedManyWithoutTeachersInputSchema)
        .optional(),
      workDates: z
        .lazy(() => TeacherWorkDateCreateNestedManyWithoutTeacherInputSchema)
        .optional(),
    })
    .strict();

export const TeacherUncheckedCreateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateWithoutTableSubjectsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      subjects: z
        .lazy(() => SubjectUncheckedCreateNestedManyWithoutTeachersInputSchema)
        .optional(),
      workDates: z
        .lazy(
          () =>
            TeacherWorkDateUncheckedCreateNestedManyWithoutTeacherInputSchema,
        )
        .optional(),
    })
    .strict();

export const TeacherCreateOrConnectWithoutTableSubjectsInputSchema: z.ZodType<Prisma.TeacherCreateOrConnectWithoutTableSubjectsInput> =
  z
    .object({
      where: z.lazy(() => TeacherWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TeacherCreateWithoutTableSubjectsInputSchema),
        z.lazy(() => TeacherUncheckedCreateWithoutTableSubjectsInputSchema),
      ]),
    })
    .strict();

export const HallCreateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.HallCreateWithoutTableSubjectsInput> =
  z
    .object({
      name: z.string(),
      studentsCount: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const HallUncheckedCreateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.HallUncheckedCreateWithoutTableSubjectsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      studentsCount: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
    })
    .strict();

export const HallCreateOrConnectWithoutTableSubjectsInputSchema: z.ZodType<Prisma.HallCreateOrConnectWithoutTableSubjectsInput> =
  z
    .object({
      where: z.lazy(() => HallWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => HallCreateWithoutTableSubjectsInputSchema),
        z.lazy(() => HallUncheckedCreateWithoutTableSubjectsInputSchema),
      ]),
    })
    .strict();

export const TableUpsertWithoutSubjectsInputSchema: z.ZodType<Prisma.TableUpsertWithoutSubjectsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => TableUpdateWithoutSubjectsInputSchema),
        z.lazy(() => TableUncheckedUpdateWithoutSubjectsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TableCreateWithoutSubjectsInputSchema),
        z.lazy(() => TableUncheckedCreateWithoutSubjectsInputSchema),
      ]),
      where: z.lazy(() => TableWhereInputSchema).optional(),
    })
    .strict();

export const TableUpdateToOneWithWhereWithoutSubjectsInputSchema: z.ZodType<Prisma.TableUpdateToOneWithWhereWithoutSubjectsInput> =
  z
    .object({
      where: z.lazy(() => TableWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => TableUpdateWithoutSubjectsInputSchema),
        z.lazy(() => TableUncheckedUpdateWithoutSubjectsInputSchema),
      ]),
    })
    .strict();

export const TableUpdateWithoutSubjectsInputSchema: z.ZodType<Prisma.TableUpdateWithoutSubjectsInput> =
  z
    .object({
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      level: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      semester: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      major: z
        .lazy(() => MajorUpdateOneRequiredWithoutTablesNestedInputSchema)
        .optional(),
    })
    .strict();

export const TableUncheckedUpdateWithoutSubjectsInputSchema: z.ZodType<Prisma.TableUncheckedUpdateWithoutSubjectsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      level: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      semester: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      majorId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const DayUpsertWithoutTableSubjectsInputSchema: z.ZodType<Prisma.DayUpsertWithoutTableSubjectsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => DayUpdateWithoutTableSubjectsInputSchema),
        z.lazy(() => DayUncheckedUpdateWithoutTableSubjectsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DayCreateWithoutTableSubjectsInputSchema),
        z.lazy(() => DayUncheckedCreateWithoutTableSubjectsInputSchema),
      ]),
      where: z.lazy(() => DayWhereInputSchema).optional(),
    })
    .strict();

export const DayUpdateToOneWithWhereWithoutTableSubjectsInputSchema: z.ZodType<Prisma.DayUpdateToOneWithWhereWithoutTableSubjectsInput> =
  z
    .object({
      where: z.lazy(() => DayWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => DayUpdateWithoutTableSubjectsInputSchema),
        z.lazy(() => DayUncheckedUpdateWithoutTableSubjectsInputSchema),
      ]),
    })
    .strict();

export const DayUpdateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.DayUpdateWithoutTableSubjectsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherWorkDates: z
        .lazy(() => TeacherWorkDateUpdateManyWithoutDayNestedInputSchema)
        .optional(),
    })
    .strict();

export const DayUncheckedUpdateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.DayUncheckedUpdateWithoutTableSubjectsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherWorkDates: z
        .lazy(
          () => TeacherWorkDateUncheckedUpdateManyWithoutDayNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const SubjectUpsertWithoutTableSubjectsInputSchema: z.ZodType<Prisma.SubjectUpsertWithoutTableSubjectsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => SubjectUpdateWithoutTableSubjectsInputSchema),
        z.lazy(() => SubjectUncheckedUpdateWithoutTableSubjectsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SubjectCreateWithoutTableSubjectsInputSchema),
        z.lazy(() => SubjectUncheckedCreateWithoutTableSubjectsInputSchema),
      ]),
      where: z.lazy(() => SubjectWhereInputSchema).optional(),
    })
    .strict();

export const SubjectUpdateToOneWithWhereWithoutTableSubjectsInputSchema: z.ZodType<Prisma.SubjectUpdateToOneWithWhereWithoutTableSubjectsInput> =
  z
    .object({
      where: z.lazy(() => SubjectWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => SubjectUpdateWithoutTableSubjectsInputSchema),
        z.lazy(() => SubjectUncheckedUpdateWithoutTableSubjectsInputSchema),
      ]),
    })
    .strict();

export const SubjectUpdateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.SubjectUpdateWithoutTableSubjectsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teachers: z
        .lazy(() => TeacherUpdateManyWithoutSubjectsNestedInputSchema)
        .optional(),
    })
    .strict();

export const SubjectUncheckedUpdateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateWithoutTableSubjectsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teachers: z
        .lazy(() => TeacherUncheckedUpdateManyWithoutSubjectsNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeacherUpsertWithoutTableSubjectsInputSchema: z.ZodType<Prisma.TeacherUpsertWithoutTableSubjectsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => TeacherUpdateWithoutTableSubjectsInputSchema),
        z.lazy(() => TeacherUncheckedUpdateWithoutTableSubjectsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TeacherCreateWithoutTableSubjectsInputSchema),
        z.lazy(() => TeacherUncheckedCreateWithoutTableSubjectsInputSchema),
      ]),
      where: z.lazy(() => TeacherWhereInputSchema).optional(),
    })
    .strict();

export const TeacherUpdateToOneWithWhereWithoutTableSubjectsInputSchema: z.ZodType<Prisma.TeacherUpdateToOneWithWhereWithoutTableSubjectsInput> =
  z
    .object({
      where: z.lazy(() => TeacherWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => TeacherUpdateWithoutTableSubjectsInputSchema),
        z.lazy(() => TeacherUncheckedUpdateWithoutTableSubjectsInputSchema),
      ]),
    })
    .strict();

export const TeacherUpdateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.TeacherUpdateWithoutTableSubjectsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjects: z
        .lazy(() => SubjectUpdateManyWithoutTeachersNestedInputSchema)
        .optional(),
      workDates: z
        .lazy(() => TeacherWorkDateUpdateManyWithoutTeacherNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeacherUncheckedUpdateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateWithoutTableSubjectsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjects: z
        .lazy(() => SubjectUncheckedUpdateManyWithoutTeachersNestedInputSchema)
        .optional(),
      workDates: z
        .lazy(
          () =>
            TeacherWorkDateUncheckedUpdateManyWithoutTeacherNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const HallUpsertWithoutTableSubjectsInputSchema: z.ZodType<Prisma.HallUpsertWithoutTableSubjectsInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => HallUpdateWithoutTableSubjectsInputSchema),
        z.lazy(() => HallUncheckedUpdateWithoutTableSubjectsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => HallCreateWithoutTableSubjectsInputSchema),
        z.lazy(() => HallUncheckedCreateWithoutTableSubjectsInputSchema),
      ]),
      where: z.lazy(() => HallWhereInputSchema).optional(),
    })
    .strict();

export const HallUpdateToOneWithWhereWithoutTableSubjectsInputSchema: z.ZodType<Prisma.HallUpdateToOneWithWhereWithoutTableSubjectsInput> =
  z
    .object({
      where: z.lazy(() => HallWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => HallUpdateWithoutTableSubjectsInputSchema),
        z.lazy(() => HallUncheckedUpdateWithoutTableSubjectsInputSchema),
      ]),
    })
    .strict();

export const HallUpdateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.HallUpdateWithoutTableSubjectsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      studentsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const HallUncheckedUpdateWithoutTableSubjectsInputSchema: z.ZodType<Prisma.HallUncheckedUpdateWithoutTableSubjectsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      studentsCount: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubjectCreateWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectCreateWithoutTeachersInput> =
  z
    .object({
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      tableSubjects: z
        .lazy(() => TableSubjectCreateNestedManyWithoutSubjectInputSchema)
        .optional(),
    })
    .strict();

export const SubjectUncheckedCreateWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUncheckedCreateWithoutTeachersInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      tableSubjects: z
        .lazy(
          () => TableSubjectUncheckedCreateNestedManyWithoutSubjectInputSchema,
        )
        .optional(),
    })
    .strict();

export const SubjectCreateOrConnectWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectCreateOrConnectWithoutTeachersInput> =
  z
    .object({
      where: z.lazy(() => SubjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
        z.lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema),
      ]),
    })
    .strict();

export const TeacherWorkDateCreateWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateCreateWithoutTeacherInput> =
  z
    .object({
      startsAt: z.number(),
      endsAt: z.number(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      day: z.lazy(() => DayCreateNestedOneWithoutTeacherWorkDatesInputSchema),
    })
    .strict();

export const TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedCreateWithoutTeacherInput> =
  z
    .object({
      id: z.number().int().optional(),
      startsAt: z.number(),
      endsAt: z.number(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      dayId: z.number().int(),
    })
    .strict();

export const TeacherWorkDateCreateOrConnectWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateCreateOrConnectWithoutTeacherInput> =
  z
    .object({
      where: z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TeacherWorkDateCreateWithoutTeacherInputSchema),
        z.lazy(() => TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema),
      ]),
    })
    .strict();

export const TableSubjectCreateWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectCreateWithoutTeacherInput> =
  z
    .object({
      startsAt: z.number(),
      endsAt: z.number(),
      table: z.lazy(() => TableCreateNestedOneWithoutSubjectsInputSchema),
      day: z.lazy(() => DayCreateNestedOneWithoutTableSubjectsInputSchema),
      subject: z.lazy(
        () => SubjectCreateNestedOneWithoutTableSubjectsInputSchema,
      ),
      hall: z.lazy(() => HallCreateNestedOneWithoutTableSubjectsInputSchema),
    })
    .strict();

export const TableSubjectUncheckedCreateWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateWithoutTeacherInput> =
  z
    .object({
      id: z.number().int().optional(),
      startsAt: z.number(),
      endsAt: z.number(),
      tableId: z.number().int(),
      dayId: z.number().int(),
      subjectId: z.number().int(),
      hallId: z.number().int(),
    })
    .strict();

export const TableSubjectCreateOrConnectWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectCreateOrConnectWithoutTeacherInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TableSubjectCreateWithoutTeacherInputSchema),
        z.lazy(() => TableSubjectUncheckedCreateWithoutTeacherInputSchema),
      ]),
    })
    .strict();

export const SubjectUpsertWithWhereUniqueWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUpsertWithWhereUniqueWithoutTeachersInput> =
  z
    .object({
      where: z.lazy(() => SubjectWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => SubjectUpdateWithoutTeachersInputSchema),
        z.lazy(() => SubjectUncheckedUpdateWithoutTeachersInputSchema),
      ]),
      create: z.union([
        z.lazy(() => SubjectCreateWithoutTeachersInputSchema),
        z.lazy(() => SubjectUncheckedCreateWithoutTeachersInputSchema),
      ]),
    })
    .strict();

export const SubjectUpdateWithWhereUniqueWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUpdateWithWhereUniqueWithoutTeachersInput> =
  z
    .object({
      where: z.lazy(() => SubjectWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => SubjectUpdateWithoutTeachersInputSchema),
        z.lazy(() => SubjectUncheckedUpdateWithoutTeachersInputSchema),
      ]),
    })
    .strict();

export const SubjectUpdateManyWithWhereWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUpdateManyWithWhereWithoutTeachersInput> =
  z
    .object({
      where: z.lazy(() => SubjectScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => SubjectUpdateManyMutationInputSchema),
        z.lazy(() => SubjectUncheckedUpdateManyWithoutTeachersInputSchema),
      ]),
    })
    .strict();

export const SubjectScalarWhereInputSchema: z.ZodType<Prisma.SubjectScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => SubjectScalarWhereInputSchema),
          z.lazy(() => SubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => SubjectScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => SubjectScalarWhereInputSchema),
          z.lazy(() => SubjectScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUpsertWithWhereUniqueWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateUpsertWithWhereUniqueWithoutTeacherInput> =
  z
    .object({
      where: z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TeacherWorkDateUpdateWithoutTeacherInputSchema),
        z.lazy(() => TeacherWorkDateUncheckedUpdateWithoutTeacherInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TeacherWorkDateCreateWithoutTeacherInputSchema),
        z.lazy(() => TeacherWorkDateUncheckedCreateWithoutTeacherInputSchema),
      ]),
    })
    .strict();

export const TeacherWorkDateUpdateWithWhereUniqueWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateUpdateWithWhereUniqueWithoutTeacherInput> =
  z
    .object({
      where: z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TeacherWorkDateUpdateWithoutTeacherInputSchema),
        z.lazy(() => TeacherWorkDateUncheckedUpdateWithoutTeacherInputSchema),
      ]),
    })
    .strict();

export const TeacherWorkDateUpdateManyWithWhereWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateUpdateManyWithWhereWithoutTeacherInput> =
  z
    .object({
      where: z.lazy(() => TeacherWorkDateScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TeacherWorkDateUpdateManyMutationInputSchema),
        z.lazy(
          () => TeacherWorkDateUncheckedUpdateManyWithoutTeacherInputSchema,
        ),
      ]),
    })
    .strict();

export const TeacherWorkDateScalarWhereInputSchema: z.ZodType<Prisma.TeacherWorkDateScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema),
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TeacherWorkDateScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema),
          z.lazy(() => TeacherWorkDateScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      startsAt: z
        .union([z.lazy(() => FloatFilterSchema), z.number()])
        .optional(),
      endsAt: z.union([z.lazy(() => FloatFilterSchema), z.number()]).optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      teacherId: z
        .union([z.lazy(() => IntFilterSchema), z.number()])
        .optional(),
      dayId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
    })
    .strict();

export const TableSubjectUpsertWithWhereUniqueWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectUpsertWithWhereUniqueWithoutTeacherInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TableSubjectUpdateWithoutTeacherInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateWithoutTeacherInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TableSubjectCreateWithoutTeacherInputSchema),
        z.lazy(() => TableSubjectUncheckedCreateWithoutTeacherInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateWithWhereUniqueWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectUpdateWithWhereUniqueWithoutTeacherInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TableSubjectUpdateWithoutTeacherInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateWithoutTeacherInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateManyWithWhereWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyWithWhereWithoutTeacherInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TableSubjectUpdateManyMutationInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateManyWithoutTeacherInputSchema),
      ]),
    })
    .strict();

export const DayCreateWithoutTeacherWorkDatesInputSchema: z.ZodType<Prisma.DayCreateWithoutTeacherWorkDatesInput> =
  z
    .object({
      name: z.string(),
      tableSubjects: z
        .lazy(() => TableSubjectCreateNestedManyWithoutDayInputSchema)
        .optional(),
    })
    .strict();

export const DayUncheckedCreateWithoutTeacherWorkDatesInputSchema: z.ZodType<Prisma.DayUncheckedCreateWithoutTeacherWorkDatesInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      tableSubjects: z
        .lazy(() => TableSubjectUncheckedCreateNestedManyWithoutDayInputSchema)
        .optional(),
    })
    .strict();

export const DayCreateOrConnectWithoutTeacherWorkDatesInputSchema: z.ZodType<Prisma.DayCreateOrConnectWithoutTeacherWorkDatesInput> =
  z
    .object({
      where: z.lazy(() => DayWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => DayCreateWithoutTeacherWorkDatesInputSchema),
        z.lazy(() => DayUncheckedCreateWithoutTeacherWorkDatesInputSchema),
      ]),
    })
    .strict();

export const TeacherCreateWithoutWorkDatesInputSchema: z.ZodType<Prisma.TeacherCreateWithoutWorkDatesInput> =
  z
    .object({
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      subjects: z
        .lazy(() => SubjectCreateNestedManyWithoutTeachersInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectCreateNestedManyWithoutTeacherInputSchema)
        .optional(),
    })
    .strict();

export const TeacherUncheckedCreateWithoutWorkDatesInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateWithoutWorkDatesInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      subjects: z
        .lazy(() => SubjectUncheckedCreateNestedManyWithoutTeachersInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(
          () => TableSubjectUncheckedCreateNestedManyWithoutTeacherInputSchema,
        )
        .optional(),
    })
    .strict();

export const TeacherCreateOrConnectWithoutWorkDatesInputSchema: z.ZodType<Prisma.TeacherCreateOrConnectWithoutWorkDatesInput> =
  z
    .object({
      where: z.lazy(() => TeacherWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TeacherCreateWithoutWorkDatesInputSchema),
        z.lazy(() => TeacherUncheckedCreateWithoutWorkDatesInputSchema),
      ]),
    })
    .strict();

export const DayUpsertWithoutTeacherWorkDatesInputSchema: z.ZodType<Prisma.DayUpsertWithoutTeacherWorkDatesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => DayUpdateWithoutTeacherWorkDatesInputSchema),
        z.lazy(() => DayUncheckedUpdateWithoutTeacherWorkDatesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => DayCreateWithoutTeacherWorkDatesInputSchema),
        z.lazy(() => DayUncheckedCreateWithoutTeacherWorkDatesInputSchema),
      ]),
      where: z.lazy(() => DayWhereInputSchema).optional(),
    })
    .strict();

export const DayUpdateToOneWithWhereWithoutTeacherWorkDatesInputSchema: z.ZodType<Prisma.DayUpdateToOneWithWhereWithoutTeacherWorkDatesInput> =
  z
    .object({
      where: z.lazy(() => DayWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => DayUpdateWithoutTeacherWorkDatesInputSchema),
        z.lazy(() => DayUncheckedUpdateWithoutTeacherWorkDatesInputSchema),
      ]),
    })
    .strict();

export const DayUpdateWithoutTeacherWorkDatesInputSchema: z.ZodType<Prisma.DayUpdateWithoutTeacherWorkDatesInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectUpdateManyWithoutDayNestedInputSchema)
        .optional(),
    })
    .strict();

export const DayUncheckedUpdateWithoutTeacherWorkDatesInputSchema: z.ZodType<Prisma.DayUncheckedUpdateWithoutTeacherWorkDatesInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectUncheckedUpdateManyWithoutDayNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeacherUpsertWithoutWorkDatesInputSchema: z.ZodType<Prisma.TeacherUpsertWithoutWorkDatesInput> =
  z
    .object({
      update: z.union([
        z.lazy(() => TeacherUpdateWithoutWorkDatesInputSchema),
        z.lazy(() => TeacherUncheckedUpdateWithoutWorkDatesInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TeacherCreateWithoutWorkDatesInputSchema),
        z.lazy(() => TeacherUncheckedCreateWithoutWorkDatesInputSchema),
      ]),
      where: z.lazy(() => TeacherWhereInputSchema).optional(),
    })
    .strict();

export const TeacherUpdateToOneWithWhereWithoutWorkDatesInputSchema: z.ZodType<Prisma.TeacherUpdateToOneWithWhereWithoutWorkDatesInput> =
  z
    .object({
      where: z.lazy(() => TeacherWhereInputSchema).optional(),
      data: z.union([
        z.lazy(() => TeacherUpdateWithoutWorkDatesInputSchema),
        z.lazy(() => TeacherUncheckedUpdateWithoutWorkDatesInputSchema),
      ]),
    })
    .strict();

export const TeacherUpdateWithoutWorkDatesInputSchema: z.ZodType<Prisma.TeacherUpdateWithoutWorkDatesInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjects: z
        .lazy(() => SubjectUpdateManyWithoutTeachersNestedInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectUpdateManyWithoutTeacherNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeacherUncheckedUpdateWithoutWorkDatesInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateWithoutWorkDatesInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjects: z
        .lazy(() => SubjectUncheckedUpdateManyWithoutTeachersNestedInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(
          () => TableSubjectUncheckedUpdateManyWithoutTeacherNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const TableCreateWithoutMajorInputSchema: z.ZodType<Prisma.TableCreateWithoutMajorInput> =
  z
    .object({
      type: z.number().int(),
      level: z.number().int(),
      semester: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      subjects: z
        .lazy(() => TableSubjectCreateNestedManyWithoutTableInputSchema)
        .optional(),
    })
    .strict();

export const TableUncheckedCreateWithoutMajorInputSchema: z.ZodType<Prisma.TableUncheckedCreateWithoutMajorInput> =
  z
    .object({
      id: z.number().int().optional(),
      type: z.number().int(),
      level: z.number().int(),
      semester: z.number().int(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      subjects: z
        .lazy(
          () => TableSubjectUncheckedCreateNestedManyWithoutTableInputSchema,
        )
        .optional(),
    })
    .strict();

export const TableCreateOrConnectWithoutMajorInputSchema: z.ZodType<Prisma.TableCreateOrConnectWithoutMajorInput> =
  z
    .object({
      where: z.lazy(() => TableWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TableCreateWithoutMajorInputSchema),
        z.lazy(() => TableUncheckedCreateWithoutMajorInputSchema),
      ]),
    })
    .strict();

export const TableUpsertWithWhereUniqueWithoutMajorInputSchema: z.ZodType<Prisma.TableUpsertWithWhereUniqueWithoutMajorInput> =
  z
    .object({
      where: z.lazy(() => TableWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TableUpdateWithoutMajorInputSchema),
        z.lazy(() => TableUncheckedUpdateWithoutMajorInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TableCreateWithoutMajorInputSchema),
        z.lazy(() => TableUncheckedCreateWithoutMajorInputSchema),
      ]),
    })
    .strict();

export const TableUpdateWithWhereUniqueWithoutMajorInputSchema: z.ZodType<Prisma.TableUpdateWithWhereUniqueWithoutMajorInput> =
  z
    .object({
      where: z.lazy(() => TableWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TableUpdateWithoutMajorInputSchema),
        z.lazy(() => TableUncheckedUpdateWithoutMajorInputSchema),
      ]),
    })
    .strict();

export const TableUpdateManyWithWhereWithoutMajorInputSchema: z.ZodType<Prisma.TableUpdateManyWithWhereWithoutMajorInput> =
  z
    .object({
      where: z.lazy(() => TableScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TableUpdateManyMutationInputSchema),
        z.lazy(() => TableUncheckedUpdateManyWithoutMajorInputSchema),
      ]),
    })
    .strict();

export const TableScalarWhereInputSchema: z.ZodType<Prisma.TableScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TableScalarWhereInputSchema),
          z.lazy(() => TableScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TableScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TableScalarWhereInputSchema),
          z.lazy(() => TableScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      type: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      level: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      semester: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      majorId: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const TableSubjectCreateWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectCreateWithoutHallInput> =
  z
    .object({
      startsAt: z.number(),
      endsAt: z.number(),
      table: z.lazy(() => TableCreateNestedOneWithoutSubjectsInputSchema),
      day: z.lazy(() => DayCreateNestedOneWithoutTableSubjectsInputSchema),
      subject: z.lazy(
        () => SubjectCreateNestedOneWithoutTableSubjectsInputSchema,
      ),
      teacher: z.lazy(
        () => TeacherCreateNestedOneWithoutTableSubjectsInputSchema,
      ),
    })
    .strict();

export const TableSubjectUncheckedCreateWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateWithoutHallInput> =
  z
    .object({
      id: z.number().int().optional(),
      startsAt: z.number(),
      endsAt: z.number(),
      tableId: z.number().int(),
      dayId: z.number().int(),
      subjectId: z.number().int(),
      teacherId: z.number().int(),
    })
    .strict();

export const TableSubjectCreateOrConnectWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectCreateOrConnectWithoutHallInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TableSubjectCreateWithoutHallInputSchema),
        z.lazy(() => TableSubjectUncheckedCreateWithoutHallInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpsertWithWhereUniqueWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectUpsertWithWhereUniqueWithoutHallInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TableSubjectUpdateWithoutHallInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateWithoutHallInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TableSubjectCreateWithoutHallInputSchema),
        z.lazy(() => TableSubjectUncheckedCreateWithoutHallInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateWithWhereUniqueWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectUpdateWithWhereUniqueWithoutHallInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TableSubjectUpdateWithoutHallInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateWithoutHallInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateManyWithWhereWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyWithWhereWithoutHallInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TableSubjectUpdateManyMutationInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateManyWithoutHallInputSchema),
      ]),
    })
    .strict();

export const TeacherCreateWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherCreateWithoutSubjectsInput> =
  z
    .object({
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      workDates: z
        .lazy(() => TeacherWorkDateCreateNestedManyWithoutTeacherInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectCreateNestedManyWithoutTeacherInputSchema)
        .optional(),
    })
    .strict();

export const TeacherUncheckedCreateWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUncheckedCreateWithoutSubjectsInput> =
  z
    .object({
      id: z.number().int().optional(),
      name: z.string(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      workDates: z
        .lazy(
          () =>
            TeacherWorkDateUncheckedCreateNestedManyWithoutTeacherInputSchema,
        )
        .optional(),
      tableSubjects: z
        .lazy(
          () => TableSubjectUncheckedCreateNestedManyWithoutTeacherInputSchema,
        )
        .optional(),
    })
    .strict();

export const TeacherCreateOrConnectWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherCreateOrConnectWithoutSubjectsInput> =
  z
    .object({
      where: z.lazy(() => TeacherWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
        z.lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema),
      ]),
    })
    .strict();

export const TableSubjectCreateWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectCreateWithoutSubjectInput> =
  z
    .object({
      startsAt: z.number(),
      endsAt: z.number(),
      table: z.lazy(() => TableCreateNestedOneWithoutSubjectsInputSchema),
      day: z.lazy(() => DayCreateNestedOneWithoutTableSubjectsInputSchema),
      teacher: z.lazy(
        () => TeacherCreateNestedOneWithoutTableSubjectsInputSchema,
      ),
      hall: z.lazy(() => HallCreateNestedOneWithoutTableSubjectsInputSchema),
    })
    .strict();

export const TableSubjectUncheckedCreateWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateWithoutSubjectInput> =
  z
    .object({
      id: z.number().int().optional(),
      startsAt: z.number(),
      endsAt: z.number(),
      tableId: z.number().int(),
      dayId: z.number().int(),
      teacherId: z.number().int(),
      hallId: z.number().int(),
    })
    .strict();

export const TableSubjectCreateOrConnectWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectCreateOrConnectWithoutSubjectInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TableSubjectCreateWithoutSubjectInputSchema),
        z.lazy(() => TableSubjectUncheckedCreateWithoutSubjectInputSchema),
      ]),
    })
    .strict();

export const TeacherUpsertWithWhereUniqueWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUpsertWithWhereUniqueWithoutSubjectsInput> =
  z
    .object({
      where: z.lazy(() => TeacherWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TeacherUpdateWithoutSubjectsInputSchema),
        z.lazy(() => TeacherUncheckedUpdateWithoutSubjectsInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TeacherCreateWithoutSubjectsInputSchema),
        z.lazy(() => TeacherUncheckedCreateWithoutSubjectsInputSchema),
      ]),
    })
    .strict();

export const TeacherUpdateWithWhereUniqueWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUpdateWithWhereUniqueWithoutSubjectsInput> =
  z
    .object({
      where: z.lazy(() => TeacherWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TeacherUpdateWithoutSubjectsInputSchema),
        z.lazy(() => TeacherUncheckedUpdateWithoutSubjectsInputSchema),
      ]),
    })
    .strict();

export const TeacherUpdateManyWithWhereWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUpdateManyWithWhereWithoutSubjectsInput> =
  z
    .object({
      where: z.lazy(() => TeacherScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TeacherUpdateManyMutationInputSchema),
        z.lazy(() => TeacherUncheckedUpdateManyWithoutSubjectsInputSchema),
      ]),
    })
    .strict();

export const TeacherScalarWhereInputSchema: z.ZodType<Prisma.TeacherScalarWhereInput> =
  z
    .object({
      AND: z
        .union([
          z.lazy(() => TeacherScalarWhereInputSchema),
          z.lazy(() => TeacherScalarWhereInputSchema).array(),
        ])
        .optional(),
      OR: z
        .lazy(() => TeacherScalarWhereInputSchema)
        .array()
        .optional(),
      NOT: z
        .union([
          z.lazy(() => TeacherScalarWhereInputSchema),
          z.lazy(() => TeacherScalarWhereInputSchema).array(),
        ])
        .optional(),
      id: z.union([z.lazy(() => IntFilterSchema), z.number()]).optional(),
      name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
      updatedAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
      createdAt: z
        .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
        .optional(),
    })
    .strict();

export const TableSubjectUpsertWithWhereUniqueWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectUpsertWithWhereUniqueWithoutSubjectInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TableSubjectUpdateWithoutSubjectInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateWithoutSubjectInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TableSubjectCreateWithoutSubjectInputSchema),
        z.lazy(() => TableSubjectUncheckedCreateWithoutSubjectInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateWithWhereUniqueWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectUpdateWithWhereUniqueWithoutSubjectInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TableSubjectUpdateWithoutSubjectInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateWithoutSubjectInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateManyWithWhereWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyWithWhereWithoutSubjectInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TableSubjectUpdateManyMutationInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateManyWithoutSubjectInputSchema),
      ]),
    })
    .strict();

export const TeacherWorkDateCreateWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateCreateWithoutDayInput> =
  z
    .object({
      startsAt: z.number(),
      endsAt: z.number(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      teacher: z.lazy(() => TeacherCreateNestedOneWithoutWorkDatesInputSchema),
    })
    .strict();

export const TeacherWorkDateUncheckedCreateWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedCreateWithoutDayInput> =
  z
    .object({
      id: z.number().int().optional(),
      startsAt: z.number(),
      endsAt: z.number(),
      updatedAt: z.coerce.date().optional(),
      createdAt: z.coerce.date().optional(),
      teacherId: z.number().int(),
    })
    .strict();

export const TeacherWorkDateCreateOrConnectWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateCreateOrConnectWithoutDayInput> =
  z
    .object({
      where: z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TeacherWorkDateCreateWithoutDayInputSchema),
        z.lazy(() => TeacherWorkDateUncheckedCreateWithoutDayInputSchema),
      ]),
    })
    .strict();

export const TableSubjectCreateWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectCreateWithoutDayInput> =
  z
    .object({
      startsAt: z.number(),
      endsAt: z.number(),
      table: z.lazy(() => TableCreateNestedOneWithoutSubjectsInputSchema),
      subject: z.lazy(
        () => SubjectCreateNestedOneWithoutTableSubjectsInputSchema,
      ),
      teacher: z.lazy(
        () => TeacherCreateNestedOneWithoutTableSubjectsInputSchema,
      ),
      hall: z.lazy(() => HallCreateNestedOneWithoutTableSubjectsInputSchema),
    })
    .strict();

export const TableSubjectUncheckedCreateWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectUncheckedCreateWithoutDayInput> =
  z
    .object({
      id: z.number().int().optional(),
      startsAt: z.number(),
      endsAt: z.number(),
      tableId: z.number().int(),
      subjectId: z.number().int(),
      teacherId: z.number().int(),
      hallId: z.number().int(),
    })
    .strict();

export const TableSubjectCreateOrConnectWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectCreateOrConnectWithoutDayInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      create: z.union([
        z.lazy(() => TableSubjectCreateWithoutDayInputSchema),
        z.lazy(() => TableSubjectUncheckedCreateWithoutDayInputSchema),
      ]),
    })
    .strict();

export const TeacherWorkDateUpsertWithWhereUniqueWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateUpsertWithWhereUniqueWithoutDayInput> =
  z
    .object({
      where: z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TeacherWorkDateUpdateWithoutDayInputSchema),
        z.lazy(() => TeacherWorkDateUncheckedUpdateWithoutDayInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TeacherWorkDateCreateWithoutDayInputSchema),
        z.lazy(() => TeacherWorkDateUncheckedCreateWithoutDayInputSchema),
      ]),
    })
    .strict();

export const TeacherWorkDateUpdateWithWhereUniqueWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateUpdateWithWhereUniqueWithoutDayInput> =
  z
    .object({
      where: z.lazy(() => TeacherWorkDateWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TeacherWorkDateUpdateWithoutDayInputSchema),
        z.lazy(() => TeacherWorkDateUncheckedUpdateWithoutDayInputSchema),
      ]),
    })
    .strict();

export const TeacherWorkDateUpdateManyWithWhereWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateUpdateManyWithWhereWithoutDayInput> =
  z
    .object({
      where: z.lazy(() => TeacherWorkDateScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TeacherWorkDateUpdateManyMutationInputSchema),
        z.lazy(() => TeacherWorkDateUncheckedUpdateManyWithoutDayInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpsertWithWhereUniqueWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectUpsertWithWhereUniqueWithoutDayInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      update: z.union([
        z.lazy(() => TableSubjectUpdateWithoutDayInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateWithoutDayInputSchema),
      ]),
      create: z.union([
        z.lazy(() => TableSubjectCreateWithoutDayInputSchema),
        z.lazy(() => TableSubjectUncheckedCreateWithoutDayInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateWithWhereUniqueWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectUpdateWithWhereUniqueWithoutDayInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectWhereUniqueInputSchema),
      data: z.union([
        z.lazy(() => TableSubjectUpdateWithoutDayInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateWithoutDayInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateManyWithWhereWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectUpdateManyWithWhereWithoutDayInput> =
  z
    .object({
      where: z.lazy(() => TableSubjectScalarWhereInputSchema),
      data: z.union([
        z.lazy(() => TableSubjectUpdateManyMutationInputSchema),
        z.lazy(() => TableSubjectUncheckedUpdateManyWithoutDayInputSchema),
      ]),
    })
    .strict();

export const TableSubjectUpdateWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectUpdateWithoutTableInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      day: z
        .lazy(() => DayUpdateOneRequiredWithoutTableSubjectsNestedInputSchema)
        .optional(),
      subject: z
        .lazy(
          () => SubjectUpdateOneRequiredWithoutTableSubjectsNestedInputSchema,
        )
        .optional(),
      teacher: z
        .lazy(
          () => TeacherUpdateOneRequiredWithoutTableSubjectsNestedInputSchema,
        )
        .optional(),
      hall: z
        .lazy(() => HallUpdateOneRequiredWithoutTableSubjectsNestedInputSchema)
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateWithoutTableInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjectId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hallId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyWithoutTableInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyWithoutTableInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjectId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hallId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const SubjectUpdateWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUpdateWithoutTeachersInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectUpdateManyWithoutSubjectNestedInputSchema)
        .optional(),
    })
    .strict();

export const SubjectUncheckedUpdateWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateWithoutTeachersInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableSubjects: z
        .lazy(
          () => TableSubjectUncheckedUpdateManyWithoutSubjectNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const SubjectUncheckedUpdateManyWithoutTeachersInputSchema: z.ZodType<Prisma.SubjectUncheckedUpdateManyWithoutTeachersInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUpdateWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateUpdateWithoutTeacherInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      day: z
        .lazy(
          () => DayUpdateOneRequiredWithoutTeacherWorkDatesNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const TeacherWorkDateUncheckedUpdateWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedUpdateWithoutTeacherInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUncheckedUpdateManyWithoutTeacherInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedUpdateManyWithoutTeacherInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpdateWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectUpdateWithoutTeacherInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      table: z
        .lazy(() => TableUpdateOneRequiredWithoutSubjectsNestedInputSchema)
        .optional(),
      day: z
        .lazy(() => DayUpdateOneRequiredWithoutTableSubjectsNestedInputSchema)
        .optional(),
      subject: z
        .lazy(
          () => SubjectUpdateOneRequiredWithoutTableSubjectsNestedInputSchema,
        )
        .optional(),
      hall: z
        .lazy(() => HallUpdateOneRequiredWithoutTableSubjectsNestedInputSchema)
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateWithoutTeacherInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjectId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hallId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyWithoutTeacherInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyWithoutTeacherInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjectId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hallId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableUpdateWithoutMajorInputSchema: z.ZodType<Prisma.TableUpdateWithoutMajorInput> =
  z
    .object({
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      level: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      semester: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjects: z
        .lazy(() => TableSubjectUpdateManyWithoutTableNestedInputSchema)
        .optional(),
    })
    .strict();

export const TableUncheckedUpdateWithoutMajorInputSchema: z.ZodType<Prisma.TableUncheckedUpdateWithoutMajorInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      level: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      semester: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjects: z
        .lazy(
          () => TableSubjectUncheckedUpdateManyWithoutTableNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const TableUncheckedUpdateManyWithoutMajorInputSchema: z.ZodType<Prisma.TableUncheckedUpdateManyWithoutMajorInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      type: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      level: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      semester: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpdateWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectUpdateWithoutHallInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      table: z
        .lazy(() => TableUpdateOneRequiredWithoutSubjectsNestedInputSchema)
        .optional(),
      day: z
        .lazy(() => DayUpdateOneRequiredWithoutTableSubjectsNestedInputSchema)
        .optional(),
      subject: z
        .lazy(
          () => SubjectUpdateOneRequiredWithoutTableSubjectsNestedInputSchema,
        )
        .optional(),
      teacher: z
        .lazy(
          () => TeacherUpdateOneRequiredWithoutTableSubjectsNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateWithoutHallInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjectId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyWithoutHallInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyWithoutHallInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjectId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherUpdateWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUpdateWithoutSubjectsInput> =
  z
    .object({
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workDates: z
        .lazy(() => TeacherWorkDateUpdateManyWithoutTeacherNestedInputSchema)
        .optional(),
      tableSubjects: z
        .lazy(() => TableSubjectUpdateManyWithoutTeacherNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeacherUncheckedUpdateWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateWithoutSubjectsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      workDates: z
        .lazy(
          () =>
            TeacherWorkDateUncheckedUpdateManyWithoutTeacherNestedInputSchema,
        )
        .optional(),
      tableSubjects: z
        .lazy(
          () => TableSubjectUncheckedUpdateManyWithoutTeacherNestedInputSchema,
        )
        .optional(),
    })
    .strict();

export const TeacherUncheckedUpdateManyWithoutSubjectsInputSchema: z.ZodType<Prisma.TeacherUncheckedUpdateManyWithoutSubjectsInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      name: z
        .union([
          z.string(),
          z.lazy(() => StringFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpdateWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectUpdateWithoutSubjectInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      table: z
        .lazy(() => TableUpdateOneRequiredWithoutSubjectsNestedInputSchema)
        .optional(),
      day: z
        .lazy(() => DayUpdateOneRequiredWithoutTableSubjectsNestedInputSchema)
        .optional(),
      teacher: z
        .lazy(
          () => TeacherUpdateOneRequiredWithoutTableSubjectsNestedInputSchema,
        )
        .optional(),
      hall: z
        .lazy(() => HallUpdateOneRequiredWithoutTableSubjectsNestedInputSchema)
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateWithoutSubjectInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hallId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyWithoutSubjectInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyWithoutSubjectInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      dayId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hallId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUpdateWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateUpdateWithoutDayInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacher: z
        .lazy(() => TeacherUpdateOneRequiredWithoutWorkDatesNestedInputSchema)
        .optional(),
    })
    .strict();

export const TeacherWorkDateUncheckedUpdateWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedUpdateWithoutDayInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateUncheckedUpdateManyWithoutDayInputSchema: z.ZodType<Prisma.TeacherWorkDateUncheckedUpdateManyWithoutDayInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      updatedAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      createdAt: z
        .union([
          z.coerce.date(),
          z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUpdateWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectUpdateWithoutDayInput> =
  z
    .object({
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      table: z
        .lazy(() => TableUpdateOneRequiredWithoutSubjectsNestedInputSchema)
        .optional(),
      subject: z
        .lazy(
          () => SubjectUpdateOneRequiredWithoutTableSubjectsNestedInputSchema,
        )
        .optional(),
      teacher: z
        .lazy(
          () => TeacherUpdateOneRequiredWithoutTableSubjectsNestedInputSchema,
        )
        .optional(),
      hall: z
        .lazy(() => HallUpdateOneRequiredWithoutTableSubjectsNestedInputSchema)
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateWithoutDayInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjectId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hallId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectUncheckedUpdateManyWithoutDayInputSchema: z.ZodType<Prisma.TableSubjectUncheckedUpdateManyWithoutDayInput> =
  z
    .object({
      id: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      startsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      endsAt: z
        .union([
          z.number(),
          z.lazy(() => FloatFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      tableId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      subjectId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      teacherId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
      hallId: z
        .union([
          z.number().int(),
          z.lazy(() => IntFieldUpdateOperationsInputSchema),
        ])
        .optional(),
    })
    .strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const TableFindFirstArgsSchema: z.ZodType<Prisma.TableFindFirstArgs> = z
  .object({
    select: TableSelectSchema.optional(),
    include: TableIncludeSchema.optional(),
    where: TableWhereInputSchema.optional(),
    orderBy: z
      .union([
        TableOrderByWithRelationInputSchema.array(),
        TableOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TableWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TableScalarFieldEnumSchema, TableScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const TableFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TableFindFirstOrThrowArgs> =
  z
    .object({
      select: TableSelectSchema.optional(),
      include: TableIncludeSchema.optional(),
      where: TableWhereInputSchema.optional(),
      orderBy: z
        .union([
          TableOrderByWithRelationInputSchema.array(),
          TableOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TableWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([TableScalarFieldEnumSchema, TableScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const TableFindManyArgsSchema: z.ZodType<Prisma.TableFindManyArgs> = z
  .object({
    select: TableSelectSchema.optional(),
    include: TableIncludeSchema.optional(),
    where: TableWhereInputSchema.optional(),
    orderBy: z
      .union([
        TableOrderByWithRelationInputSchema.array(),
        TableOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TableWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([TableScalarFieldEnumSchema, TableScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const TableAggregateArgsSchema: z.ZodType<Prisma.TableAggregateArgs> = z
  .object({
    where: TableWhereInputSchema.optional(),
    orderBy: z
      .union([
        TableOrderByWithRelationInputSchema.array(),
        TableOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: TableWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TableGroupByArgsSchema: z.ZodType<Prisma.TableGroupByArgs> = z
  .object({
    where: TableWhereInputSchema.optional(),
    orderBy: z
      .union([
        TableOrderByWithAggregationInputSchema.array(),
        TableOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: TableScalarFieldEnumSchema.array(),
    having: TableScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TableFindUniqueArgsSchema: z.ZodType<Prisma.TableFindUniqueArgs> =
  z
    .object({
      select: TableSelectSchema.optional(),
      include: TableIncludeSchema.optional(),
      where: TableWhereUniqueInputSchema,
    })
    .strict();

export const TableFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TableFindUniqueOrThrowArgs> =
  z
    .object({
      select: TableSelectSchema.optional(),
      include: TableIncludeSchema.optional(),
      where: TableWhereUniqueInputSchema,
    })
    .strict();

export const TableSubjectFindFirstArgsSchema: z.ZodType<Prisma.TableSubjectFindFirstArgs> =
  z
    .object({
      select: TableSubjectSelectSchema.optional(),
      include: TableSubjectIncludeSchema.optional(),
      where: TableSubjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          TableSubjectOrderByWithRelationInputSchema.array(),
          TableSubjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TableSubjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TableSubjectScalarFieldEnumSchema,
          TableSubjectScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TableSubjectFindFirstOrThrowArgs> =
  z
    .object({
      select: TableSubjectSelectSchema.optional(),
      include: TableSubjectIncludeSchema.optional(),
      where: TableSubjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          TableSubjectOrderByWithRelationInputSchema.array(),
          TableSubjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TableSubjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TableSubjectScalarFieldEnumSchema,
          TableSubjectScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectFindManyArgsSchema: z.ZodType<Prisma.TableSubjectFindManyArgs> =
  z
    .object({
      select: TableSubjectSelectSchema.optional(),
      include: TableSubjectIncludeSchema.optional(),
      where: TableSubjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          TableSubjectOrderByWithRelationInputSchema.array(),
          TableSubjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TableSubjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TableSubjectScalarFieldEnumSchema,
          TableSubjectScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TableSubjectAggregateArgsSchema: z.ZodType<Prisma.TableSubjectAggregateArgs> =
  z
    .object({
      where: TableSubjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          TableSubjectOrderByWithRelationInputSchema.array(),
          TableSubjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TableSubjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const TableSubjectGroupByArgsSchema: z.ZodType<Prisma.TableSubjectGroupByArgs> =
  z
    .object({
      where: TableSubjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          TableSubjectOrderByWithAggregationInputSchema.array(),
          TableSubjectOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: TableSubjectScalarFieldEnumSchema.array(),
      having: TableSubjectScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const TableSubjectFindUniqueArgsSchema: z.ZodType<Prisma.TableSubjectFindUniqueArgs> =
  z
    .object({
      select: TableSubjectSelectSchema.optional(),
      include: TableSubjectIncludeSchema.optional(),
      where: TableSubjectWhereUniqueInputSchema,
    })
    .strict();

export const TableSubjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TableSubjectFindUniqueOrThrowArgs> =
  z
    .object({
      select: TableSubjectSelectSchema.optional(),
      include: TableSubjectIncludeSchema.optional(),
      where: TableSubjectWhereUniqueInputSchema,
    })
    .strict();

export const TeacherFindFirstArgsSchema: z.ZodType<Prisma.TeacherFindFirstArgs> =
  z
    .object({
      select: TeacherSelectSchema.optional(),
      include: TeacherIncludeSchema.optional(),
      where: TeacherWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeacherOrderByWithRelationInputSchema.array(),
          TeacherOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TeacherWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TeacherScalarFieldEnumSchema,
          TeacherScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeacherFindFirstOrThrowArgs> =
  z
    .object({
      select: TeacherSelectSchema.optional(),
      include: TeacherIncludeSchema.optional(),
      where: TeacherWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeacherOrderByWithRelationInputSchema.array(),
          TeacherOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TeacherWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TeacherScalarFieldEnumSchema,
          TeacherScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherFindManyArgsSchema: z.ZodType<Prisma.TeacherFindManyArgs> =
  z
    .object({
      select: TeacherSelectSchema.optional(),
      include: TeacherIncludeSchema.optional(),
      where: TeacherWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeacherOrderByWithRelationInputSchema.array(),
          TeacherOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TeacherWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TeacherScalarFieldEnumSchema,
          TeacherScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherAggregateArgsSchema: z.ZodType<Prisma.TeacherAggregateArgs> =
  z
    .object({
      where: TeacherWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeacherOrderByWithRelationInputSchema.array(),
          TeacherOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TeacherWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const TeacherGroupByArgsSchema: z.ZodType<Prisma.TeacherGroupByArgs> = z
  .object({
    where: TeacherWhereInputSchema.optional(),
    orderBy: z
      .union([
        TeacherOrderByWithAggregationInputSchema.array(),
        TeacherOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: TeacherScalarFieldEnumSchema.array(),
    having: TeacherScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const TeacherFindUniqueArgsSchema: z.ZodType<Prisma.TeacherFindUniqueArgs> =
  z
    .object({
      select: TeacherSelectSchema.optional(),
      include: TeacherIncludeSchema.optional(),
      where: TeacherWhereUniqueInputSchema,
    })
    .strict();

export const TeacherFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeacherFindUniqueOrThrowArgs> =
  z
    .object({
      select: TeacherSelectSchema.optional(),
      include: TeacherIncludeSchema.optional(),
      where: TeacherWhereUniqueInputSchema,
    })
    .strict();

export const TeacherWorkDateFindFirstArgsSchema: z.ZodType<Prisma.TeacherWorkDateFindFirstArgs> =
  z
    .object({
      select: TeacherWorkDateSelectSchema.optional(),
      include: TeacherWorkDateIncludeSchema.optional(),
      where: TeacherWorkDateWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeacherWorkDateOrderByWithRelationInputSchema.array(),
          TeacherWorkDateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TeacherWorkDateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TeacherWorkDateScalarFieldEnumSchema,
          TeacherWorkDateScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateFindFirstOrThrowArgsSchema: z.ZodType<Prisma.TeacherWorkDateFindFirstOrThrowArgs> =
  z
    .object({
      select: TeacherWorkDateSelectSchema.optional(),
      include: TeacherWorkDateIncludeSchema.optional(),
      where: TeacherWorkDateWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeacherWorkDateOrderByWithRelationInputSchema.array(),
          TeacherWorkDateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TeacherWorkDateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TeacherWorkDateScalarFieldEnumSchema,
          TeacherWorkDateScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateFindManyArgsSchema: z.ZodType<Prisma.TeacherWorkDateFindManyArgs> =
  z
    .object({
      select: TeacherWorkDateSelectSchema.optional(),
      include: TeacherWorkDateIncludeSchema.optional(),
      where: TeacherWorkDateWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeacherWorkDateOrderByWithRelationInputSchema.array(),
          TeacherWorkDateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TeacherWorkDateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          TeacherWorkDateScalarFieldEnumSchema,
          TeacherWorkDateScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const TeacherWorkDateAggregateArgsSchema: z.ZodType<Prisma.TeacherWorkDateAggregateArgs> =
  z
    .object({
      where: TeacherWorkDateWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeacherWorkDateOrderByWithRelationInputSchema.array(),
          TeacherWorkDateOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: TeacherWorkDateWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const TeacherWorkDateGroupByArgsSchema: z.ZodType<Prisma.TeacherWorkDateGroupByArgs> =
  z
    .object({
      where: TeacherWorkDateWhereInputSchema.optional(),
      orderBy: z
        .union([
          TeacherWorkDateOrderByWithAggregationInputSchema.array(),
          TeacherWorkDateOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: TeacherWorkDateScalarFieldEnumSchema.array(),
      having: TeacherWorkDateScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const TeacherWorkDateFindUniqueArgsSchema: z.ZodType<Prisma.TeacherWorkDateFindUniqueArgs> =
  z
    .object({
      select: TeacherWorkDateSelectSchema.optional(),
      include: TeacherWorkDateIncludeSchema.optional(),
      where: TeacherWorkDateWhereUniqueInputSchema,
    })
    .strict();

export const TeacherWorkDateFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.TeacherWorkDateFindUniqueOrThrowArgs> =
  z
    .object({
      select: TeacherWorkDateSelectSchema.optional(),
      include: TeacherWorkDateIncludeSchema.optional(),
      where: TeacherWorkDateWhereUniqueInputSchema,
    })
    .strict();

export const MajorFindFirstArgsSchema: z.ZodType<Prisma.MajorFindFirstArgs> = z
  .object({
    select: MajorSelectSchema.optional(),
    include: MajorIncludeSchema.optional(),
    where: MajorWhereInputSchema.optional(),
    orderBy: z
      .union([
        MajorOrderByWithRelationInputSchema.array(),
        MajorOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MajorWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([MajorScalarFieldEnumSchema, MajorScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const MajorFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MajorFindFirstOrThrowArgs> =
  z
    .object({
      select: MajorSelectSchema.optional(),
      include: MajorIncludeSchema.optional(),
      where: MajorWhereInputSchema.optional(),
      orderBy: z
        .union([
          MajorOrderByWithRelationInputSchema.array(),
          MajorOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: MajorWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([MajorScalarFieldEnumSchema, MajorScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const MajorFindManyArgsSchema: z.ZodType<Prisma.MajorFindManyArgs> = z
  .object({
    select: MajorSelectSchema.optional(),
    include: MajorIncludeSchema.optional(),
    where: MajorWhereInputSchema.optional(),
    orderBy: z
      .union([
        MajorOrderByWithRelationInputSchema.array(),
        MajorOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MajorWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([MajorScalarFieldEnumSchema, MajorScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const MajorAggregateArgsSchema: z.ZodType<Prisma.MajorAggregateArgs> = z
  .object({
    where: MajorWhereInputSchema.optional(),
    orderBy: z
      .union([
        MajorOrderByWithRelationInputSchema.array(),
        MajorOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: MajorWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const MajorGroupByArgsSchema: z.ZodType<Prisma.MajorGroupByArgs> = z
  .object({
    where: MajorWhereInputSchema.optional(),
    orderBy: z
      .union([
        MajorOrderByWithAggregationInputSchema.array(),
        MajorOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: MajorScalarFieldEnumSchema.array(),
    having: MajorScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const MajorFindUniqueArgsSchema: z.ZodType<Prisma.MajorFindUniqueArgs> =
  z
    .object({
      select: MajorSelectSchema.optional(),
      include: MajorIncludeSchema.optional(),
      where: MajorWhereUniqueInputSchema,
    })
    .strict();

export const MajorFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MajorFindUniqueOrThrowArgs> =
  z
    .object({
      select: MajorSelectSchema.optional(),
      include: MajorIncludeSchema.optional(),
      where: MajorWhereUniqueInputSchema,
    })
    .strict();

export const HallFindFirstArgsSchema: z.ZodType<Prisma.HallFindFirstArgs> = z
  .object({
    select: HallSelectSchema.optional(),
    include: HallIncludeSchema.optional(),
    where: HallWhereInputSchema.optional(),
    orderBy: z
      .union([
        HallOrderByWithRelationInputSchema.array(),
        HallOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: HallWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([HallScalarFieldEnumSchema, HallScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const HallFindFirstOrThrowArgsSchema: z.ZodType<Prisma.HallFindFirstOrThrowArgs> =
  z
    .object({
      select: HallSelectSchema.optional(),
      include: HallIncludeSchema.optional(),
      where: HallWhereInputSchema.optional(),
      orderBy: z
        .union([
          HallOrderByWithRelationInputSchema.array(),
          HallOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: HallWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([HallScalarFieldEnumSchema, HallScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const HallFindManyArgsSchema: z.ZodType<Prisma.HallFindManyArgs> = z
  .object({
    select: HallSelectSchema.optional(),
    include: HallIncludeSchema.optional(),
    where: HallWhereInputSchema.optional(),
    orderBy: z
      .union([
        HallOrderByWithRelationInputSchema.array(),
        HallOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: HallWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([HallScalarFieldEnumSchema, HallScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const HallAggregateArgsSchema: z.ZodType<Prisma.HallAggregateArgs> = z
  .object({
    where: HallWhereInputSchema.optional(),
    orderBy: z
      .union([
        HallOrderByWithRelationInputSchema.array(),
        HallOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: HallWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const HallGroupByArgsSchema: z.ZodType<Prisma.HallGroupByArgs> = z
  .object({
    where: HallWhereInputSchema.optional(),
    orderBy: z
      .union([
        HallOrderByWithAggregationInputSchema.array(),
        HallOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: HallScalarFieldEnumSchema.array(),
    having: HallScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const HallFindUniqueArgsSchema: z.ZodType<Prisma.HallFindUniqueArgs> = z
  .object({
    select: HallSelectSchema.optional(),
    include: HallIncludeSchema.optional(),
    where: HallWhereUniqueInputSchema,
  })
  .strict();

export const HallFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.HallFindUniqueOrThrowArgs> =
  z
    .object({
      select: HallSelectSchema.optional(),
      include: HallIncludeSchema.optional(),
      where: HallWhereUniqueInputSchema,
    })
    .strict();

export const SubjectFindFirstArgsSchema: z.ZodType<Prisma.SubjectFindFirstArgs> =
  z
    .object({
      select: SubjectSelectSchema.optional(),
      include: SubjectIncludeSchema.optional(),
      where: SubjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubjectOrderByWithRelationInputSchema.array(),
          SubjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SubjectScalarFieldEnumSchema,
          SubjectScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SubjectFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SubjectFindFirstOrThrowArgs> =
  z
    .object({
      select: SubjectSelectSchema.optional(),
      include: SubjectIncludeSchema.optional(),
      where: SubjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubjectOrderByWithRelationInputSchema.array(),
          SubjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SubjectScalarFieldEnumSchema,
          SubjectScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SubjectFindManyArgsSchema: z.ZodType<Prisma.SubjectFindManyArgs> =
  z
    .object({
      select: SubjectSelectSchema.optional(),
      include: SubjectIncludeSchema.optional(),
      where: SubjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubjectOrderByWithRelationInputSchema.array(),
          SubjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SubjectScalarFieldEnumSchema,
          SubjectScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict();

export const SubjectAggregateArgsSchema: z.ZodType<Prisma.SubjectAggregateArgs> =
  z
    .object({
      where: SubjectWhereInputSchema.optional(),
      orderBy: z
        .union([
          SubjectOrderByWithRelationInputSchema.array(),
          SubjectOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SubjectWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict();

export const SubjectGroupByArgsSchema: z.ZodType<Prisma.SubjectGroupByArgs> = z
  .object({
    where: SubjectWhereInputSchema.optional(),
    orderBy: z
      .union([
        SubjectOrderByWithAggregationInputSchema.array(),
        SubjectOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: SubjectScalarFieldEnumSchema.array(),
    having: SubjectScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const SubjectFindUniqueArgsSchema: z.ZodType<Prisma.SubjectFindUniqueArgs> =
  z
    .object({
      select: SubjectSelectSchema.optional(),
      include: SubjectIncludeSchema.optional(),
      where: SubjectWhereUniqueInputSchema,
    })
    .strict();

export const SubjectFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SubjectFindUniqueOrThrowArgs> =
  z
    .object({
      select: SubjectSelectSchema.optional(),
      include: SubjectIncludeSchema.optional(),
      where: SubjectWhereUniqueInputSchema,
    })
    .strict();

export const DayFindFirstArgsSchema: z.ZodType<Prisma.DayFindFirstArgs> = z
  .object({
    select: DaySelectSchema.optional(),
    include: DayIncludeSchema.optional(),
    where: DayWhereInputSchema.optional(),
    orderBy: z
      .union([
        DayOrderByWithRelationInputSchema.array(),
        DayOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: DayWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([DayScalarFieldEnumSchema, DayScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const DayFindFirstOrThrowArgsSchema: z.ZodType<Prisma.DayFindFirstOrThrowArgs> =
  z
    .object({
      select: DaySelectSchema.optional(),
      include: DayIncludeSchema.optional(),
      where: DayWhereInputSchema.optional(),
      orderBy: z
        .union([
          DayOrderByWithRelationInputSchema.array(),
          DayOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: DayWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([DayScalarFieldEnumSchema, DayScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict();

export const DayFindManyArgsSchema: z.ZodType<Prisma.DayFindManyArgs> = z
  .object({
    select: DaySelectSchema.optional(),
    include: DayIncludeSchema.optional(),
    where: DayWhereInputSchema.optional(),
    orderBy: z
      .union([
        DayOrderByWithRelationInputSchema.array(),
        DayOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: DayWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([DayScalarFieldEnumSchema, DayScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict();

export const DayAggregateArgsSchema: z.ZodType<Prisma.DayAggregateArgs> = z
  .object({
    where: DayWhereInputSchema.optional(),
    orderBy: z
      .union([
        DayOrderByWithRelationInputSchema.array(),
        DayOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: DayWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const DayGroupByArgsSchema: z.ZodType<Prisma.DayGroupByArgs> = z
  .object({
    where: DayWhereInputSchema.optional(),
    orderBy: z
      .union([
        DayOrderByWithAggregationInputSchema.array(),
        DayOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: DayScalarFieldEnumSchema.array(),
    having: DayScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict();

export const DayFindUniqueArgsSchema: z.ZodType<Prisma.DayFindUniqueArgs> = z
  .object({
    select: DaySelectSchema.optional(),
    include: DayIncludeSchema.optional(),
    where: DayWhereUniqueInputSchema,
  })
  .strict();

export const DayFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.DayFindUniqueOrThrowArgs> =
  z
    .object({
      select: DaySelectSchema.optional(),
      include: DayIncludeSchema.optional(),
      where: DayWhereUniqueInputSchema,
    })
    .strict();

export const TableCreateArgsSchema: z.ZodType<Prisma.TableCreateArgs> = z
  .object({
    select: TableSelectSchema.optional(),
    include: TableIncludeSchema.optional(),
    data: z.union([TableCreateInputSchema, TableUncheckedCreateInputSchema]),
  })
  .strict();

export const TableUpsertArgsSchema: z.ZodType<Prisma.TableUpsertArgs> = z
  .object({
    select: TableSelectSchema.optional(),
    include: TableIncludeSchema.optional(),
    where: TableWhereUniqueInputSchema,
    create: z.union([TableCreateInputSchema, TableUncheckedCreateInputSchema]),
    update: z.union([TableUpdateInputSchema, TableUncheckedUpdateInputSchema]),
  })
  .strict();

export const TableDeleteArgsSchema: z.ZodType<Prisma.TableDeleteArgs> = z
  .object({
    select: TableSelectSchema.optional(),
    include: TableIncludeSchema.optional(),
    where: TableWhereUniqueInputSchema,
  })
  .strict();

export const TableUpdateArgsSchema: z.ZodType<Prisma.TableUpdateArgs> = z
  .object({
    select: TableSelectSchema.optional(),
    include: TableIncludeSchema.optional(),
    data: z.union([TableUpdateInputSchema, TableUncheckedUpdateInputSchema]),
    where: TableWhereUniqueInputSchema,
  })
  .strict();

export const TableUpdateManyArgsSchema: z.ZodType<Prisma.TableUpdateManyArgs> =
  z
    .object({
      data: z.union([
        TableUpdateManyMutationInputSchema,
        TableUncheckedUpdateManyInputSchema,
      ]),
      where: TableWhereInputSchema.optional(),
    })
    .strict();

export const TableDeleteManyArgsSchema: z.ZodType<Prisma.TableDeleteManyArgs> =
  z
    .object({
      where: TableWhereInputSchema.optional(),
    })
    .strict();

export const TableSubjectCreateArgsSchema: z.ZodType<Prisma.TableSubjectCreateArgs> =
  z
    .object({
      select: TableSubjectSelectSchema.optional(),
      include: TableSubjectIncludeSchema.optional(),
      data: z.union([
        TableSubjectCreateInputSchema,
        TableSubjectUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const TableSubjectUpsertArgsSchema: z.ZodType<Prisma.TableSubjectUpsertArgs> =
  z
    .object({
      select: TableSubjectSelectSchema.optional(),
      include: TableSubjectIncludeSchema.optional(),
      where: TableSubjectWhereUniqueInputSchema,
      create: z.union([
        TableSubjectCreateInputSchema,
        TableSubjectUncheckedCreateInputSchema,
      ]),
      update: z.union([
        TableSubjectUpdateInputSchema,
        TableSubjectUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const TableSubjectDeleteArgsSchema: z.ZodType<Prisma.TableSubjectDeleteArgs> =
  z
    .object({
      select: TableSubjectSelectSchema.optional(),
      include: TableSubjectIncludeSchema.optional(),
      where: TableSubjectWhereUniqueInputSchema,
    })
    .strict();

export const TableSubjectUpdateArgsSchema: z.ZodType<Prisma.TableSubjectUpdateArgs> =
  z
    .object({
      select: TableSubjectSelectSchema.optional(),
      include: TableSubjectIncludeSchema.optional(),
      data: z.union([
        TableSubjectUpdateInputSchema,
        TableSubjectUncheckedUpdateInputSchema,
      ]),
      where: TableSubjectWhereUniqueInputSchema,
    })
    .strict();

export const TableSubjectUpdateManyArgsSchema: z.ZodType<Prisma.TableSubjectUpdateManyArgs> =
  z
    .object({
      data: z.union([
        TableSubjectUpdateManyMutationInputSchema,
        TableSubjectUncheckedUpdateManyInputSchema,
      ]),
      where: TableSubjectWhereInputSchema.optional(),
    })
    .strict();

export const TableSubjectDeleteManyArgsSchema: z.ZodType<Prisma.TableSubjectDeleteManyArgs> =
  z
    .object({
      where: TableSubjectWhereInputSchema.optional(),
    })
    .strict();

export const TeacherCreateArgsSchema: z.ZodType<Prisma.TeacherCreateArgs> = z
  .object({
    select: TeacherSelectSchema.optional(),
    include: TeacherIncludeSchema.optional(),
    data: z.union([
      TeacherCreateInputSchema,
      TeacherUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const TeacherUpsertArgsSchema: z.ZodType<Prisma.TeacherUpsertArgs> = z
  .object({
    select: TeacherSelectSchema.optional(),
    include: TeacherIncludeSchema.optional(),
    where: TeacherWhereUniqueInputSchema,
    create: z.union([
      TeacherCreateInputSchema,
      TeacherUncheckedCreateInputSchema,
    ]),
    update: z.union([
      TeacherUpdateInputSchema,
      TeacherUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const TeacherDeleteArgsSchema: z.ZodType<Prisma.TeacherDeleteArgs> = z
  .object({
    select: TeacherSelectSchema.optional(),
    include: TeacherIncludeSchema.optional(),
    where: TeacherWhereUniqueInputSchema,
  })
  .strict();

export const TeacherUpdateArgsSchema: z.ZodType<Prisma.TeacherUpdateArgs> = z
  .object({
    select: TeacherSelectSchema.optional(),
    include: TeacherIncludeSchema.optional(),
    data: z.union([
      TeacherUpdateInputSchema,
      TeacherUncheckedUpdateInputSchema,
    ]),
    where: TeacherWhereUniqueInputSchema,
  })
  .strict();

export const TeacherUpdateManyArgsSchema: z.ZodType<Prisma.TeacherUpdateManyArgs> =
  z
    .object({
      data: z.union([
        TeacherUpdateManyMutationInputSchema,
        TeacherUncheckedUpdateManyInputSchema,
      ]),
      where: TeacherWhereInputSchema.optional(),
    })
    .strict();

export const TeacherDeleteManyArgsSchema: z.ZodType<Prisma.TeacherDeleteManyArgs> =
  z
    .object({
      where: TeacherWhereInputSchema.optional(),
    })
    .strict();

export const TeacherWorkDateCreateArgsSchema: z.ZodType<Prisma.TeacherWorkDateCreateArgs> =
  z
    .object({
      select: TeacherWorkDateSelectSchema.optional(),
      include: TeacherWorkDateIncludeSchema.optional(),
      data: z.union([
        TeacherWorkDateCreateInputSchema,
        TeacherWorkDateUncheckedCreateInputSchema,
      ]),
    })
    .strict();

export const TeacherWorkDateUpsertArgsSchema: z.ZodType<Prisma.TeacherWorkDateUpsertArgs> =
  z
    .object({
      select: TeacherWorkDateSelectSchema.optional(),
      include: TeacherWorkDateIncludeSchema.optional(),
      where: TeacherWorkDateWhereUniqueInputSchema,
      create: z.union([
        TeacherWorkDateCreateInputSchema,
        TeacherWorkDateUncheckedCreateInputSchema,
      ]),
      update: z.union([
        TeacherWorkDateUpdateInputSchema,
        TeacherWorkDateUncheckedUpdateInputSchema,
      ]),
    })
    .strict();

export const TeacherWorkDateDeleteArgsSchema: z.ZodType<Prisma.TeacherWorkDateDeleteArgs> =
  z
    .object({
      select: TeacherWorkDateSelectSchema.optional(),
      include: TeacherWorkDateIncludeSchema.optional(),
      where: TeacherWorkDateWhereUniqueInputSchema,
    })
    .strict();

export const TeacherWorkDateUpdateArgsSchema: z.ZodType<Prisma.TeacherWorkDateUpdateArgs> =
  z
    .object({
      select: TeacherWorkDateSelectSchema.optional(),
      include: TeacherWorkDateIncludeSchema.optional(),
      data: z.union([
        TeacherWorkDateUpdateInputSchema,
        TeacherWorkDateUncheckedUpdateInputSchema,
      ]),
      where: TeacherWorkDateWhereUniqueInputSchema,
    })
    .strict();

export const TeacherWorkDateUpdateManyArgsSchema: z.ZodType<Prisma.TeacherWorkDateUpdateManyArgs> =
  z
    .object({
      data: z.union([
        TeacherWorkDateUpdateManyMutationInputSchema,
        TeacherWorkDateUncheckedUpdateManyInputSchema,
      ]),
      where: TeacherWorkDateWhereInputSchema.optional(),
    })
    .strict();

export const TeacherWorkDateDeleteManyArgsSchema: z.ZodType<Prisma.TeacherWorkDateDeleteManyArgs> =
  z
    .object({
      where: TeacherWorkDateWhereInputSchema.optional(),
    })
    .strict();

export const MajorCreateArgsSchema: z.ZodType<Prisma.MajorCreateArgs> = z
  .object({
    select: MajorSelectSchema.optional(),
    include: MajorIncludeSchema.optional(),
    data: z.union([MajorCreateInputSchema, MajorUncheckedCreateInputSchema]),
  })
  .strict();

export const MajorUpsertArgsSchema: z.ZodType<Prisma.MajorUpsertArgs> = z
  .object({
    select: MajorSelectSchema.optional(),
    include: MajorIncludeSchema.optional(),
    where: MajorWhereUniqueInputSchema,
    create: z.union([MajorCreateInputSchema, MajorUncheckedCreateInputSchema]),
    update: z.union([MajorUpdateInputSchema, MajorUncheckedUpdateInputSchema]),
  })
  .strict();

export const MajorDeleteArgsSchema: z.ZodType<Prisma.MajorDeleteArgs> = z
  .object({
    select: MajorSelectSchema.optional(),
    include: MajorIncludeSchema.optional(),
    where: MajorWhereUniqueInputSchema,
  })
  .strict();

export const MajorUpdateArgsSchema: z.ZodType<Prisma.MajorUpdateArgs> = z
  .object({
    select: MajorSelectSchema.optional(),
    include: MajorIncludeSchema.optional(),
    data: z.union([MajorUpdateInputSchema, MajorUncheckedUpdateInputSchema]),
    where: MajorWhereUniqueInputSchema,
  })
  .strict();

export const MajorUpdateManyArgsSchema: z.ZodType<Prisma.MajorUpdateManyArgs> =
  z
    .object({
      data: z.union([
        MajorUpdateManyMutationInputSchema,
        MajorUncheckedUpdateManyInputSchema,
      ]),
      where: MajorWhereInputSchema.optional(),
    })
    .strict();

export const MajorDeleteManyArgsSchema: z.ZodType<Prisma.MajorDeleteManyArgs> =
  z
    .object({
      where: MajorWhereInputSchema.optional(),
    })
    .strict();

export const HallCreateArgsSchema: z.ZodType<Prisma.HallCreateArgs> = z
  .object({
    select: HallSelectSchema.optional(),
    include: HallIncludeSchema.optional(),
    data: z.union([HallCreateInputSchema, HallUncheckedCreateInputSchema]),
  })
  .strict();

export const HallUpsertArgsSchema: z.ZodType<Prisma.HallUpsertArgs> = z
  .object({
    select: HallSelectSchema.optional(),
    include: HallIncludeSchema.optional(),
    where: HallWhereUniqueInputSchema,
    create: z.union([HallCreateInputSchema, HallUncheckedCreateInputSchema]),
    update: z.union([HallUpdateInputSchema, HallUncheckedUpdateInputSchema]),
  })
  .strict();

export const HallDeleteArgsSchema: z.ZodType<Prisma.HallDeleteArgs> = z
  .object({
    select: HallSelectSchema.optional(),
    include: HallIncludeSchema.optional(),
    where: HallWhereUniqueInputSchema,
  })
  .strict();

export const HallUpdateArgsSchema: z.ZodType<Prisma.HallUpdateArgs> = z
  .object({
    select: HallSelectSchema.optional(),
    include: HallIncludeSchema.optional(),
    data: z.union([HallUpdateInputSchema, HallUncheckedUpdateInputSchema]),
    where: HallWhereUniqueInputSchema,
  })
  .strict();

export const HallUpdateManyArgsSchema: z.ZodType<Prisma.HallUpdateManyArgs> = z
  .object({
    data: z.union([
      HallUpdateManyMutationInputSchema,
      HallUncheckedUpdateManyInputSchema,
    ]),
    where: HallWhereInputSchema.optional(),
  })
  .strict();

export const HallDeleteManyArgsSchema: z.ZodType<Prisma.HallDeleteManyArgs> = z
  .object({
    where: HallWhereInputSchema.optional(),
  })
  .strict();

export const SubjectCreateArgsSchema: z.ZodType<Prisma.SubjectCreateArgs> = z
  .object({
    select: SubjectSelectSchema.optional(),
    include: SubjectIncludeSchema.optional(),
    data: z.union([
      SubjectCreateInputSchema,
      SubjectUncheckedCreateInputSchema,
    ]),
  })
  .strict();

export const SubjectUpsertArgsSchema: z.ZodType<Prisma.SubjectUpsertArgs> = z
  .object({
    select: SubjectSelectSchema.optional(),
    include: SubjectIncludeSchema.optional(),
    where: SubjectWhereUniqueInputSchema,
    create: z.union([
      SubjectCreateInputSchema,
      SubjectUncheckedCreateInputSchema,
    ]),
    update: z.union([
      SubjectUpdateInputSchema,
      SubjectUncheckedUpdateInputSchema,
    ]),
  })
  .strict();

export const SubjectDeleteArgsSchema: z.ZodType<Prisma.SubjectDeleteArgs> = z
  .object({
    select: SubjectSelectSchema.optional(),
    include: SubjectIncludeSchema.optional(),
    where: SubjectWhereUniqueInputSchema,
  })
  .strict();

export const SubjectUpdateArgsSchema: z.ZodType<Prisma.SubjectUpdateArgs> = z
  .object({
    select: SubjectSelectSchema.optional(),
    include: SubjectIncludeSchema.optional(),
    data: z.union([
      SubjectUpdateInputSchema,
      SubjectUncheckedUpdateInputSchema,
    ]),
    where: SubjectWhereUniqueInputSchema,
  })
  .strict();

export const SubjectUpdateManyArgsSchema: z.ZodType<Prisma.SubjectUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SubjectUpdateManyMutationInputSchema,
        SubjectUncheckedUpdateManyInputSchema,
      ]),
      where: SubjectWhereInputSchema.optional(),
    })
    .strict();

export const SubjectDeleteManyArgsSchema: z.ZodType<Prisma.SubjectDeleteManyArgs> =
  z
    .object({
      where: SubjectWhereInputSchema.optional(),
    })
    .strict();

export const DayCreateArgsSchema: z.ZodType<Prisma.DayCreateArgs> = z
  .object({
    select: DaySelectSchema.optional(),
    include: DayIncludeSchema.optional(),
    data: z.union([DayCreateInputSchema, DayUncheckedCreateInputSchema]),
  })
  .strict();

export const DayUpsertArgsSchema: z.ZodType<Prisma.DayUpsertArgs> = z
  .object({
    select: DaySelectSchema.optional(),
    include: DayIncludeSchema.optional(),
    where: DayWhereUniqueInputSchema,
    create: z.union([DayCreateInputSchema, DayUncheckedCreateInputSchema]),
    update: z.union([DayUpdateInputSchema, DayUncheckedUpdateInputSchema]),
  })
  .strict();

export const DayDeleteArgsSchema: z.ZodType<Prisma.DayDeleteArgs> = z
  .object({
    select: DaySelectSchema.optional(),
    include: DayIncludeSchema.optional(),
    where: DayWhereUniqueInputSchema,
  })
  .strict();

export const DayUpdateArgsSchema: z.ZodType<Prisma.DayUpdateArgs> = z
  .object({
    select: DaySelectSchema.optional(),
    include: DayIncludeSchema.optional(),
    data: z.union([DayUpdateInputSchema, DayUncheckedUpdateInputSchema]),
    where: DayWhereUniqueInputSchema,
  })
  .strict();

export const DayUpdateManyArgsSchema: z.ZodType<Prisma.DayUpdateManyArgs> = z
  .object({
    data: z.union([
      DayUpdateManyMutationInputSchema,
      DayUncheckedUpdateManyInputSchema,
    ]),
    where: DayWhereInputSchema.optional(),
  })
  .strict();

export const DayDeleteManyArgsSchema: z.ZodType<Prisma.DayDeleteManyArgs> = z
  .object({
    where: DayWhereInputSchema.optional(),
  })
  .strict();
