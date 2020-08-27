import { Owner } from './Owner';

export interface HubRepo{
total_count: number;
name: string;
description: string;
stargazers_count: number;
open_issues: number;
created_at: Date;
owner: Owner;
}

