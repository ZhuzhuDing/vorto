/**
 * Copyright (c) 2020 Contributors to the Eclipse Foundation
 *
 * See the NOTICE file(s) distributed with this work for additional
 * information regarding copyright ownership.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License 2.0 which is available at
 * https://www.eclipse.org/legal/epl-2.0
 *
 * SPDX-License-Identifier: EPL-2.0
 */
package org.eclipse.vorto.repository;

import org.eclipse.vorto.repository.account.UserAccountServiceTest;
import org.eclipse.vorto.repository.backup.RepositoryAdminTest;
import org.eclipse.vorto.repository.core.RepositoryUnitTestSuite;
import org.eclipse.vorto.repository.importer.ImporterUnitTestSuite;
import org.eclipse.vorto.repository.indexing.IndexingTest;
import org.eclipse.vorto.repository.mapping.PayloadMappingSpecificationTest;
import org.eclipse.vorto.repository.model.BulkOperationServiceTest;
import org.eclipse.vorto.repository.services.ValidationTest;
import org.eclipse.vorto.repository.workflow.WorkflowTest;
import org.junit.runner.RunWith;
import org.junit.runners.Suite;
import org.junit.runners.Suite.SuiteClasses;

@RunWith(Suite.class)
@SuiteClasses({UserAccountServiceTest.class,
              RepositoryAdminTest.class,
              RepositoryUnitTestSuite.class,
              ImporterUnitTestSuite.class,
              IndexingTest.class,
              BulkOperationServiceTest.class,
              PayloadMappingSpecificationTest.class,
              WorkflowTest.class, ValidationTest.class})
public class UnitTestSuite {

}
