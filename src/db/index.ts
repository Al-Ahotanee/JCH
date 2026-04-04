export const db: any = {
  select: () => ({
    from: () => ({
      where: () => ({
        orderBy: () => ({ limit: () => Promise.resolve([]), groupBy: () => Promise.resolve([]), then: () => Promise.resolve([]) }),
        limit: () => ({ then: () => Promise.resolve([]) }),
        all: () => Promise.resolve([]),
        then: () => Promise.resolve([]),
      }),
      all: () => ({ then: () => Promise.resolve([]) }),
      orderBy: () => ({ then: () => Promise.resolve([]) }),
      leftJoin: () => ({ where: () => ({ then: () => Promise.resolve([]), limit: () => ({ then: () => Promise.resolve([]) }) }) }),
    }),
  }),
  insert: () => ({
    into: () => ({
      values: () => ({ returning: () => Promise.resolve([]) }),
    }),
  }),
  update: () => ({
    set: () => ({
      where: () => ({ returning: () => Promise.resolve([]) }),
    }),
  }),
  delete: () => ({
    where: () => ({ returning: () => Promise.resolve([]) }),
  }),
};