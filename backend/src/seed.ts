import { AppDataSource } from './config/typeorm.config';
import { Organization } from './entities/organization.entity';

async function seed() {
  try {
    await AppDataSource.initialize();
    console.log('Database connected');

    const orgRepository = AppDataSource.getRepository(Organization);

    // Check if default org exists
    const existingOrg = await orgRepository.findOne({
      where: { id: '00000000-0000-0000-0000-000000000001' },
    });

    if (existingOrg) {
      console.log('Default organization already exists');
      return;
    }

    // Create default organization
    const org = orgRepository.create({
      id: '00000000-0000-0000-0000-000000000001',
      name: 'Demo Company',
      subdomain: 'demo',
      settings: null,
    });

    await orgRepository.save(org);
    console.log('✅ Default organization created successfully!');
    console.log('Organization ID:', org.id);
    console.log('Name:', org.name);

  } catch (error) {
    console.error('❌ Seed failed:', error);
  } finally {
    await AppDataSource.destroy();
  }
}

seed();
